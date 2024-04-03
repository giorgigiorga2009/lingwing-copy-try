import React, { useMemo, useState } from 'react'
import ChatHistory from '../ChatHistory';
import { TaskData, getTasks } from '@utils/lessons/getTask';
import CurrentTaskInput from '../CurrentTaskInput';
import { getLevelColors } from '@utils/lessons/taskInputUtils';
import ChatCurrentTask from '../ChatCurrentTask';
import { getVoiceRecognition, useTaskStore, useVoiceRecognition } from '@utils/store';
import { TaskProgress } from '../TaskProgress';
import { VoiceRecognition } from '../VoiceRecognition';
import { useAudio } from '@utils/lessons/audioUtils';
import { MistakesCounter } from '../MistakesCounter';
import { saveTask } from '@utils/lessons/saveTask';
import VoiceHandler from './VoiceHandler';

const locales: { [key: string]: string } = {
    'deu': 'de-DE',
    'eng': 'es-ES',
    'esp': 'es-ES',
    'geo': 'ka-GE',
    'fre': 'fr-FR',
    'ita': 'it-IT',
    'rus': 'ru-RU',
}

interface IInitialVars {
    wordsObject: Record<string, any>;
    wordIndex: number;
    wordObj: Record<string, any>;
    word: string;
    lettersObj: Record<string, any>;
    letters: [];
    currentLetterObj: Record<string, any>;
    charIndex: number;
    char: string;
    charObj: Record<string, any>;
    lastChar: string;
    lastCharObj: Record<string, any>
}


type TaskFieldsUpdateKeys =
    'progress' |
    'currentWordIndex' |
    'currentWordIsDone' |
    'currentWordHasError' |
    'currentWordVoiceRecognized' |
    'currentCharIsDone' |
    'currentCharAddError' |
    'updateNewCurrentCharIndex' |
    'updateNewCurrentCharSymbol'


const normalizeStr = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


const TaskWrapper: React.FC<any> = ({
    data,
    setCurrentTaskNumber,
    setCompletedTasks,
    completedTasks,
    getTasksHandler,
    commonProps,
    onDivHeight,
    taskCount,
    currentTaskNumber
}) => {

    if (!data || !data.obj) return;

    const task = { ...data.obj };
    // const words = task.wordsAudio?.words;

    const errorLimit = task.errorLimit;

    const [key, setKey] = useState<string>('')
    const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
    const [grammarHeight, setGrammarHeight] = useState<number>(0)
    const [isGrammarHeightCalled, setIsGrammarHeightCalled] = useState<boolean>(false)

    const [mistakeCount, setMistakeCount] = useState<number>(0) // რამდენი შეცდომის უფლება აქვს ტასკზე

    const { SetHintShow, SetHintText } = useTaskStore(state => state);

    const handleGrammarHeight = (height: number) => {
        setGrammarHeight(height)
        setIsGrammarHeightCalled(true)
    }


    const initialValues = (task: any) => {


        if (task && task.wordsAudio && task.wordsAudio.words) {

            const wordsObject = task.wordsAudio.words;

            const wordIndex = wordsObject.current || 0; // მიმდინარე სიტყვის ინდექსი
            const wordObj = wordsObject.data && wordsObject.data[wordIndex] ? wordsObject.data[wordIndex] : {}; // მიმდინარე სიტყვის ობიექტი
            const word = wordObj && wordObj.word; // მიმდინარე სიტყვა ( string )

            const lettersObj = wordObj.letters || {}; // სიმბოლოების ობიექტი { letters : {} , current: {} }

            const letters = lettersObj.all || []; // მიმდინარე სიტყვის  სიმბოლოების მასივი
            const currentLetterObj = lettersObj.current || {}; // მიმდინარე სიმბოლოს index && char  ( მაგ.   { index:0 , char: 'I' } )
            const charIndex = currentLetterObj.index || 0;  // მიმდინარე სიმბოლოს ინდექსი
            const char = currentLetterObj.char || ''; // მიმდინარე სიმბოლო
            const charObj = letters[charIndex] || {}; // მიმდინარე სიმბოლოს ობიექტი


            const lastCharObj = letters.length > 0 ? letters[letters.length - 1] : {}; // ბოლო სიმბოლოს ობიექტი
            const lastChar = lastCharObj.char || ''; // ბოლო სიმბოლოს ობიექტი


            return {
                wordsObject,
                wordIndex,
                wordObj,
                word,
                lettersObj,
                letters,
                currentLetterObj,
                charIndex,
                char,
                charObj,
                lastChar,
                lastCharObj
            }
        }
    }

    const updateTaskFields = (key: TaskFieldsUpdateKeys, value: any) => {

        const currentWord = task.wordsAudio.words.data[task.wordsAudio.words.current];
        const currentLetterObj = currentWord.letters.current;
        const currentChar = currentWord.letters.all[currentLetterObj.index];


        switch (key) {
            case 'progress':
                task.wordsAudio.progress = value;
                break;
            case 'currentWordIndex':
                task.wordsAudio.words.current = value;
                break;
            case 'currentWordIsDone':
                currentWord.done = value;
                break;
            case 'currentWordHasError':
                currentWord.error = value;
                break;
            case 'currentWordVoiceRecognized':
                currentWord.recognized = value;
                break;
            case 'currentCharIsDone':
                currentChar.done = value;
                break;
            case 'currentCharAddError':
                currentChar.error = currentChar.error + value;
                break;
            case 'updateNewCurrentCharIndex':
                currentLetterObj.index = value;
                break;
            case 'updateNewCurrentCharSymbol':
                currentLetterObj.char = value;
                break;
            default:
                console.log('----------- nothing to update.');
                break;
        }
    }

    const lastKeyHandler = (str: string) => {

        /** key  უნდა იყოს 1 სიმბოლო  (მაგ. 'Tab' - არავალიდურია) */
        if (str.length != 1) return

        const vars = initialValues(task); // საჭირო რეფერენსები task ობიექტის

        /** თუ ობიექტიდან არ არის საჭირო ინფო  */
        if (!vars) return

        const { wordsObject, wordIndex, word, letters, charObj, charIndex, char, lastCharObj } = vars;

        const hintWord = char === ' ' ? 'გამოტოვება' : word; // საწყისი ჰინტის მნიშვნელობა ( სიტუაციურად განახლდება )


        /** თუ მიმდინარე სიმბოლო დაემთხვევა შეყვანილ სიმბოლოს */
        if (str.toLocaleLowerCase() === char.toLocaleLowerCase() || str.toLocaleLowerCase() === (normalizeStr(char).toLocaleLowerCase())) {

            const strTemp = wordIndex === 0 && charIndex === 0 ? char : task.wordsAudio.progress + char;
            updateTaskFields('progress', strTemp); // პროგრესის დასეტვა ობიექტში
            updateTaskFields('currentCharIsDone', true); // მიმდინარე სიმბოლო დასრულებულია

            setKey(task.wordsAudio.progress); // თუ ისევ მიმდინარე ტასკია ჩაიწერება პროგრესი სხვა შემთხვევაში გაცარიელდება შემდეგი ტასკისთვი 

            /** შემდეგი გამოსაცნობი სიმბოლო სიტყვაში */
            const nextChar = letters.length - 1 > charIndex ? letters[charIndex + 1] : null;

            SetHintShow(false);

            /** თუ მიმდინარე სიტყვაში მოიძებნა შემდეგი სიმბოლო */
            if (nextChar) {

                updateTaskFields('updateNewCurrentCharIndex', charIndex + 1); // შემდეგი სიმბოლოს ინდექსი
                updateTaskFields('updateNewCurrentCharSymbol', nextChar.char); // შემდეგი სიმბოლო

                /** 
                 * თუ შემდეგი სიმბოლო ავტომატურად მისაწებებელია და ეს სიტყვა
                 * არ მთავრდება სფეისით  (' ') 
                 * თავიდან იძახება ამ სიმბოლოზე  lastKeyHandler(შემდეგი სიმბოლო)
                 * 
                */

                if (nextChar.auto && lastCharObj.char !== ' ') {
                    lastKeyHandler(nextChar.char);
                }

                //  else if (nextChar.auto && letters[charIndex + 2] && !letters[charIndex + 2].auto && letters[charIndex + 2].char !== ' ') {
                //     lastKeyHandler(nextChar.char);
                // } 
                else {
                    setKey(task.wordsAudio.progress); // თუ ისევ მიმდინარე ტასკია ჩაიწერება პროგრესი სხვა შემთხვევაში გაცარიელდება შემდეგი ტასკისთვი 
                }

                return

            } else if ((wordsObject.data.length - 1) > wordIndex) {

                /** თუ შეყვანილი სიმბოლოთი დასრულდა მიმდინარე სიტყვა და გვაქს შემდეგი სიტყვაც */
                updateTaskFields('currentWordIsDone', true); // მიმდინარე სიტყვა წარმატებით შესრულდა
                updateTaskFields('currentWordHasError', false); // მიმდინარე სიტყვას აღარ აქვს ერორები
                updateTaskFields('currentWordIndex', wordIndex + 1) // მიმდინარე სიტყვის ინდექსი გაიზრდება ერთით (გადავა შემდეგ სიტყვაზე)

                const nextWordObj = wordsObject.data[wordsObject.current]; // შემდეგი სიტყვის ობიექტი

                /**
                 * თუ შემდეგი სიტყვის პირველი სიმბოლო (auto) ავტომატური დასაწერია
                 * გამოიძახება lastKeyHandler პარამეტრად გადაეცემა ეს სიმბოლო.
                */
                if (nextWordObj.letters.all[0].auto) {

                    lastKeyHandler(nextWordObj.letters.all[0].char);

                    if (nextWordObj.letters.all.length === 2 && nextWordObj.letters.all[1].char === ' ') {
                        lastKeyHandler(' ')
                    }
                }

            } else {

                /** თუ მიმდინარე სიტყვა დასრულდა და ეს იყო ბოლო სიტყვა ( წინადადების დასასრული ) */

                updateTaskFields('currentWordIsDone', true); // მიმდინარე სიტყვა წარმატებით შესრულდა
                updateTaskFields('currentWordHasError', false); // მიმდინარე სიტყვას აღარ აქვს ერორები


                saveTask({
                    ...commonProps,
                    currentTask: { ...task, taskType: task.taskType.nameCode },
                    totalMistakes: mistakeCount,
                    forgivenErrorQuantity: 0,
                    error: 0,
                }).then(res => {

                    setMistakeCount(0); // დაშვებული შეცდომის განულება შემდეგი ტასკისთვის

                    if (completedTasks.findIndex((item: TaskData) => item.id === task._id) !== 1) {
                        setCompletedTasks(completedTasks.length > 0 ? [...completedTasks, { ...data }] : [{ ...data }]);


                        if (currentTaskNumber < taskCount - 1) {
                            setCurrentTaskNumber(((prev: number) => {
                                console.log(prev + 1);

                                return prev + 1;

                            }));
                        } else {
                            getTasksHandler();
                        }

                        // updateTaskFields('progress', '');
                        setKey('');
                        SetHintText('');
                        SetHintShow(false);
                    }

                    return;
                }).catch(err => {
                    console.log(err);
                })

            }

        } else if (charObj.auto && str === ' ' && lastCharObj.char === ' ' && letters[charIndex + 1].char === ' ') {

            /** 
             * შეყვანილი სიმბოლო არ დაემთხვა შესაყვანს , თუმცა 
             * შესაყვანი სიმბოლო არის ავტომატური ამიტომ , 
             * თუ შეყვანილი სიმბოლო ' ' (სფეისია) მაშინ ავტომატურად მიაბავს სხვა შემთხვევაში
             * ჩაითვლება უბრალო შეცდომად.
             */


            lastKeyHandler(charObj.char);
            lastKeyHandler(' ');

        } else {
            /** თუ მომხმარებელმა შეიყვანა არასწორი სიმბოლო */

            /** სიტყვის ობიექტის განახლება */
            updateTaskFields('currentWordHasError', true); // მიმდინარე სიტყვას აქვს ერორი
            updateTaskFields('currentCharAddError', 1); // მიმდინარე სიმბოლოზე შეცდომის მცდელობის რიცხვი გაიზარდა

            setMistakeCount(prev => prev + 1)
            SetHintText(hintWord)
            SetHintShow(true);
        }

    }

    const wordsHandler = (str: string) => {

        /** str  უნდა იყოს 1 სიმბოლო მაინც  */
        if (str.length < 1) return

        const vars = initialValues(task); // საჭირო რეფერენსები task ობიექტის

        /** თუ ობიექტიდან არ არის საჭირო ინფო  */
        if (!vars) return

        /** საჭირო ფროფერთიების რეფერენსები task ობიექტიდან */
        const { wordsObject, wordIndex, word, wordObj, letters, charObj, charIndex, char, lettersObj, lastCharObj, lastChar } = vars;

        const hintWord = word; // საწყისი ჰინტის მნიშვნელობა ( სიტუაციურად განახლდება )

        const checkWord = wordOptimizer(wordObj._word); // მიმდინარე სიტყვა რაც უნდა  შეიყვანოს იუზერმა
        const voiceInputArray = str.trim().split(' '); // სიტყვების მასივი რაც შეიყვანა იუზერმა 


        console.log('//////////////////////////////////////////////////////////////////')
        console.log('')
        console.log('')

        console.log('Input : ', str)
        console.log('The Word : ', wordOptimizer(checkWord))
        console.log('Synonyms : ', wordObj.synonyms)

        console.log('')
        console.log('')
        console.log('//////////////////////////////////////////////////////////////////')




        /** Log */
        console.log(' ')
        console.log('######## Initial Values ########')
        console.log('Voice said : ' + `'${str}'`)
        console.log('Word To Say : ' + checkWord);
        console.log('         ');


        /**
         * მომხარებლის მიერ შეყვანილ წინადადებაში ვეძებთ იმ სიტყვის ინდექს , რომელიც ემთხვევა შესაყვან სიტყვას
         * ან შესაყვანი სიტყვის სინონიმ სიტყვას.
         */
        const index = voiceInputArray.findIndex(item => {
            return wordOptimizer(item) === wordOptimizer(checkWord) || wordObj.synonyms.includes(wordOptimizer(item));
        });


        /** 
         * თუ მომხმარებლის მიერთი შეყვანილ წინადადებაში ნახსენებია 
         * სიტყვა რომლის შეყვანასაც ელოდება ალგორითმი ...
         */
        if (index >= 0) {



            let isValid = true; // საწყისად ვალიდურია ყველაფერი , ალგორითმის არ შესრულების ნებისმიერ ეტაპზე გახდება false და დაიგნორდება ნათქვამი სიტყვა

            let step = index; //  შესაყვანი სიტყვა , მოიძებნა ნათქვამ წინადადებაში და იმყოფება (index)  ინდექსზე ნათქვემი სიტყვების მასივში  
            let currentWordIndex = wordIndex; // შესაყვანი სიტყვის ინდექსი
            const resArr: string[] = []; // დროებით მასივი სადაც ინახება შესაყვანის სიტყვის წინა სიტყვები ვალიდაციის შემდეგ , რომლებიც წესით done უნდა იყოს


            /** 
             * სანამ არ დაფიქსირდება ერრორი , რომელიც შეწყვეტს  შემოწმებას 
             * და გაუშვებს პირდაპირ შეცდომაზე ან სანამ მომხმარებლის შეყვანილი სიტყვების მასივის პირველი ელემენტიც
             * არ გაივლება.
             */
            while (step >= 0 && isValid) {


                /** რადგან  --  ვიყენებთ , ყოველ ჯერზე ვამოწმებთ რომ მასივის ინდექსი 0 ზე ნაკლები არ იყოს */
                if (!voiceInputArray[step] || !wordsObject.data[currentWordIndex]) {
                    isValid = false;
                    return;
                }

                const cleanVoiceWord = wordOptimizer(voiceInputArray[step]); // მომხმარებლის შეყვანილი მიმდინარე სიტყვა
                const clearTaskWord = wordOptimizer(wordsObject.data[currentWordIndex]._word); // ტასკ ში არსებული შესაბამისი სიტყვა    



                /** 
                 * აქაც მიდის შემოწმება თუ  შესაბამისი სიტყვები  შეყვანილიც და ტასკ ში არსებული 
                 * შესაბამის ინდექსზე დაემთხვა ერთმანეთს ან  მომხმარებლის მიერ შეყვანილი შესაბამისი სიტყვა
                 * მოიძებნება საჭირო სიტყვის ობიექტში არსებული სინონიმების მასივშიც.
                 */
                if (cleanVoiceWord === clearTaskWord || wordsObject.data[currentWordIndex].synonyms.includes(cleanVoiceWord)) {
                    resArr.unshift(clearTaskWord);

                } else {
                    /** აქ თუ მოვიდა უკვე ნიშნავს  , რომ კი დაემთხვა current Word მაგრამ მის წინ რა სიტყვებიც 
                     *  ახსენა მომხმარებელმა არ დაემთხვა შესაბამის სიტყვებს.  ამიტომ ეს current Word იც არ დაისეტება.
                     */
                    isValid = false;
                }

                step--;
                currentWordIndex--;


                while (wordsObject.data[currentWordIndex] && wordsObject.data[currentWordIndex].letters && wordsObject.data[currentWordIndex].letters.all[0].auto) {
                    currentWordIndex--;
                }
            }


            if (isValid) {


                /** თუ წარმატებით დაემატა სიტყვა ,  ვანახლებთ შესაბამისი  ველებს */

                /**  სიტყვები */
                // updateTaskFields('currentWordHasError', false);
                // updateTaskFields('currentWordIsDone', true);
                // updateTaskFields('currentWordVoiceRecognized', true);

                /** სიმბოლოები */
                // updateTaskFields('updateNewCurrentCharIndex', letters.length - 1);
                // updateTaskFields('updateNewCurrentCharSymbol', letters[letters.length - 1].char);

                /** სიტყვის ყველა სიმბოლოს განახლება */
                letters.forEach((item: any, index: number) => {

                    // console.log(' Current Word Index:  ' + wordsObject.current);
                    // console.log(' Last Word Index Index:  ' + (wordsObject.data.length - 1));

                    // console.log(' Current Char Index:  ' + charObj.char);
                    // console.log(' Last letter Index Index:  ' + (letters.length - 1));
                    // console.log(' Last Char Obj', lastCharObj.auto);
                    // console.log(' Last Char Obj', lastCharObj.char);

                    // console.log(lettersObj);

                    // console.log('')


                    if (wordsObject.current === wordsObject.data.length - 1 && letters.length - 1 === lettersObj.current.index && lastCharObj.auto) {
                        console.log(wordsObject.data[wordsObject.data.length - 1]);
                    }
                    // console.log( wordsObject.current === wordsObject.data.length - 1 && lettersObj.current.index === letters.length - 1   &&   lastCharObj.auto   )




                    // console.log(wordsObject.data[wordsObject.data.length - 1]);
                    // console.log(wordObj);
                    // console.log(charObj);

                    // console.log(lastCharObj)

                    if (!(wordsObject.current === wordsObject.data.length - 1 && letters.length - 1 === lettersObj.current.index && lastCharObj.auto)) {
                        lastKeyHandler(item.char);
                    }

                })


                /** პროგრესის დამუშავება და განახლება */
                // const progArr = task.wordsAudio.progress.split(' ');
                // progArr[wordIndex] = word;
                // updateTaskFields('progress', progArr.join(' '));


                // setKey(task.wordsAudio.progress)

                // if (wordObj.letters.all[wordObj.letters.all.length - 1].char === ' ') {
                //     lastKeyHandler(' ')
                // }




                if (wordsObject.data[wordIndex + 1]) {

                    /** თუ შეყვანილი სიმბოლოთი დასრულდა მიმდინარე სიტყვა და გვაქს შემდეგი სიტყვაც */
                    // const nextWordObj = wordsObject.data[wordsObject.current + 1]; // შემდეგი სიტყვის ობიექტი

                    /**
                     * თუ შემდეგი სიტყვის პირველი სიმბოლო (auto) ავტომატური დასაწერია
                     * გამოიძახება lastKeyHandler პარამეტრად გადაეცემა ეს სიმბოლო.
                    */

                    // if (nextWordObj.letters.all[0].auto) {

                    //     lastKeyHandler(nextWordObj.letters.all[0].char)
                    // }


                    /** თუ ამ სიტყვის შემდეგ კიდევ გვაქ შემდეგი სიტყვა , მიმდინარე სიტყვის ინდექსს ვზრდით 1 ით  */
                    // updateTaskFields('currentWordIndex', wordIndex + 1);

                    /** 
                     *  რადგან ვიცით რომ მიმდინარე ტასკს კიდევ აქვს სიტყვები ,
                     *  ვამოწმებთ მიმდინარე სიტყვის  შემდეგ კიდევ თუ თქვა რამე ვოისმა.
                     */
                    if (voiceInputArray[index + 1]) {

                        /** 
                         *  რადგან ტასკშიც არის დარჩენილი სიტყვები შესასრულებელი 
                         *  და  ვოისშიც მომხმარებელმა მიმდინარე სიტყვაზე მეტი თქვა, 
                         *  ვამუშავებთ მიმდინარე სიტყვის შემდეგ დარჩენილ სტრინგს
                        */


                        console.log('----------------------Left Words To Check-----------------' + voiceInputArray[index + 1] + '---------------------')

                        wordsHandler(str.split(voiceInputArray[index])[1])
                    }

                } else {


                    // saveTask({
                    //     ...commonProps,
                    //     currentTask: { ...task, taskType: task.taskType.nameCode },
                    //     totalMistakes: mistakeCount,
                    //     forgivenErrorQuantity: 0,
                    //     error: 0,
                    // }).then(res => {

                    //     setMistakeCount(0); // დაშვებული შეცდომის განულება შემდეგი ტასკისთვის

                    //     if (completedTasks.findIndex((item: TaskData) => item.id === task._id) !== 1) {
                    //         setCompletedTasks(completedTasks.length > 0 ? [...completedTasks, { ...data }] : [{ ...data }]);

                    //         if (currentTaskNumber < taskCount - 1) {
                    //             setCurrentTaskNumber(((prev: number) => prev + 1));
                    //         } else {
                    //             getTasksHandler();
                    //         }

                    //         // updateTaskFields('progress', '');
                    //         setKey('');
                    //         SetHintText('');
                    //         SetHintShow(false);
                    //     }

                    //     return;

                    // }).catch(err => {
                    //     console.log(err);
                    // })

                }


                console.log(' ')
                console.log('Progress : ' + task.wordsAudio.progress)
            } else {
                updateTaskFields('currentWordHasError', true)
                console.log('თქვენ ნამდვილად ახსენეთ მიმდინარე შესაყვანი სიტყვა  , თუმცა წინა სიტყვები წარმოსთქვით არასწორად')
            }



        } else {


            updateTaskFields('currentWordHasError', true)
            SetHintShow(true);
            SetHintText(hintWord);
            setMistakeCount(prev => prev + 1)

            console.log(str + ' - ში პირვველი სიტყავ უნდა ყოფილიყო  ' + hintWord)
        }



        // let valid = true;
        // let step = 0;
        // let currentWordIndex = 0;

        // if (index) {

        //     step = index;
        //     currentWordIndex = wordIndex;

        //     console.log(step, currentWordIndex);

        //     while (step >= 0) {


        //         console.log(voiceInputArray[step] + ' vs ' + wordsObject.data[currentWordIndex]._word)


        //         step--;
        //         currentWordIndex--;

        //         // console.log(step ,  voiceInputArray)
        //     }
        // }

    }

    const wordOptimizer = (str: string) => {

        return normalizeStr(str.trim().toLocaleLowerCase());
    }





    // const wordCleaner = (wordObj: any): string => {

    //     const hintWord = wordObj._word;
    //     return hintWord;
    // }

    const taskProgress = () => {

        if (task.taskType?.nameCode === 'grammar') {
            return 100 + '%';
        }

        let sum = 0;

        if (task.wordsAudio && task.wordsAudio.words) {

            task.wordsAudio.words.data.forEach((item: any) => {
                if (item.done) {
                    sum++;
                }
            })

            return Math.floor(sum / task.wordsAudio.words.data.length * 100) + '%'

        } else if (task.taskType.nameCode === 'grammar') {
            return '100%'
        } else {
            return '0%'
        }

    };



    const findBestMatching = (searchWords: string, targetText: string) => {
        const searchWordsArray = searchWords.split(' ');
        const targetWordsArray = targetText.split(' ');

        let bestMatch = { index: -1, length: 0 };

        // Iterate through search words to build progressive sequences
        for (let i = 0; i < searchWordsArray.length; i++) {
            let sequence = '';
            for (let j = i; j < searchWordsArray.length; j++) {
                sequence += (j > i ? ' ' : '') + searchWordsArray[j];
                const sequenceIndex = targetText.indexOf(sequence);

                // If sequence is found and is the longest so far, update bestMatch
                if (sequenceIndex !== -1 && sequence.split(' ').length > bestMatch.length) {
                    bestMatch = { index: sequenceIndex, length: sequence.split(' ').length };
                }
            }
        }


        console.log(' # Text to find :   ', searchWords)
        console.log('  ');
        console.log(' # Text to find in :   ', targetText)
        console.log('  ');
        console.log(' # Result :   ', bestMatch)

    }






    return (
        <>

            {completedTasks && (
                <ChatHistory completedTasks={completedTasks || []} />
            )}

            {data && (
                <ChatCurrentTask
                    currentTask={data}
                    currentMessageIndex={currentMessageIndex}
                    onDivHeight={onDivHeight}
                    mistakesByLevel={getLevelColors({
                        currentTask: data,
                        currentCourseObject: commonProps.course,
                    })}
                />
            )}


            <TaskProgress taskProgress={taskProgress()} />

            <div className='d-flex gap-3 ' style={{
                display: ' flex',
                alignItems: 'center',
                gap: 25,
                justifyContent: 'flex-start',
                marginTop: '25px'
            }}>
                <MistakesCounter
                    percentage={(1 - mistakeCount / errorLimit) * 100}
                    errorLimit={Math.max(errorLimit - mistakeCount, 0)}
                />

                {
                    task.taskType.nameCode === 'grammar' ? <button
                        onClick={() => {

                            saveTask({
                                ...commonProps,
                                currentTask: { ...task, taskType: task.taskType.nameCode },
                                totalMistakes: mistakeCount,
                                forgivenErrorQuantity: 0,
                                error: 0,
                            }).then(res => {

                                setMistakeCount(0); // დაშვებული შეცდომის განულება შემდეგი ტასკისთვის

                                if (completedTasks.findIndex((item: TaskData) => item.id === task._id) !== 1) {
                                    setCompletedTasks(completedTasks.length > 0 ? [...completedTasks, { ...data }] : [{ ...data }]);

                                    if (currentTaskNumber < taskCount - 1) {
                                        setCurrentTaskNumber(((prev: number) => prev + 1));
                                    } else {
                                        getTasksHandler();
                                    }

                                    // updateTaskFields('progress', '');
                                    setKey('');
                                    SetHintText('');
                                    SetHintShow(false);
                                }

                                return;

                            }).catch(err => {
                                console.log(err);
                            })

                        }}> next </button>
                        : <input name='word'
                            onChange={() => ({})}
                            onKeyDown={(e) => lastKeyHandler(e.key)}
                            value={key}
                            style={{
                                padding: '5px',
                                width: '100%',
                                margin: '15px 0px'
                            }}
                        />

                }


                {/* <VoiceRecognition progress={taskProgress()} locale={locales[commonProps.languageTo]} /> */}

                <VoiceHandler voiceHandler={wordsHandler} />

                {/* <p onClick={() => findBestMatching('pizza at'  , task.iLearn.text as string)}> pizza at  </p>
                <p onClick={() => findBestMatching('with my girlfriend tonight'  , task.iLearn.text as string)}> with my girlfriend tonight  </p>
                <p onClick={() => findBestMatching('languages fast'  , task.iLearn.text as string)}> languages fast  </p>
                <p onClick={() => findBestMatching('learn'  , task.iLearn.text as string)}> learn </p> */}

            </div>
            {/* 
            <CurrentTaskInput
                commonProps={commonProps}
                currentMessageIndex={currentMessageIndex}
                setCurrentMessageIndex={setCurrentMessageIndex}
            /> */}
        </>
    )
}

export default TaskWrapper
