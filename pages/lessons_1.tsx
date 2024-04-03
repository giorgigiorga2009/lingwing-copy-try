import {
  CourseObject,
  getTasks,
  getUserCourse,
  TaskData,
} from '@utils/lessons/getTask'
import { NextPage } from 'next'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import style from './lessons.module.scss'
import { getUserId } from '@utils/getUserId'
import { useSession } from 'next-auth/react'
import { PageHead } from '@components/PageHead'
import { Header } from '@components/header/Header'
import { useEffect, useState, useRef } from 'react'
import ProgressBar from '@components/lessons/ProgressBar'
import ChatHistory from '@components/lessons/ChatHistory'
import { SoundCheck } from '@components/lessons/SoundCheck'
import Wrapper from '@components/lessons/learnMenu/Wrapper'
import Ratings from '@components/lessons/usersRating/Ratings'
import { getLevelColors } from '@utils/lessons/taskInputUtils'
import LearnMenu from '@components/lessons/learnMenu/LearnMenu'
import ChatCurrentTask from '@components/lessons/ChatCurrentTask'
import Feedback from '@components/lessons/combinedModals/Feedback'
import BackgroundParrot from '@components/shared/BackgroundParrot'
import CurrentTaskInput from '@components/lessons/CurrentTaskInput'
import { useUserStore, useTaskStore, UserInfo } from '@utils/store'
import FeedbackButton from '@components/lessons/combinedModals/FeedbackButton'
import CombinedModalComponent from '@components/lessons/combinedModals/combinedModals'

export type Tabs = 'course' | 'grammar' | 'vocabulary' | 'levels' | 'statistics'

const getUserToken = (state: UserInfo) => ({
  Token: state.Token,
})


const Lessons: NextPage = () => {
  const screenshotRef = useRef<HTMLDivElement>(null)
  const [tasksData, setTasksData] = useState<TaskData[]>([])
  const [currentTask, setCurrentTask] = useState<TaskData>()
  const [currentTaskNumber, setCurrentTaskNumber] = useState(0)
  const [userId, setUserId] = useState<string>('')
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [courseId, setCourseId] = useState('')
  const [completedTasks, setCompletedTasks] = useState<TaskData[]>()
  const [isSoundChecked, setSoundChecked] = useState(false)
  const [openFeedback, setOpenFeedback] = useState(false)
  const [showTopScores, setShowTopScores] = useState(true)

  const [tab, setTab] = useState<Tabs>('course')

  const [userScore, setUserScore] = useState(0)
  const [currentCourseObject, setCurrentCourseObject] = useState<CourseObject>()
  const [grammarHeight, setGrammarHeight] = useState<number>(0)
  const [isGrammarHeightCalled, setIsGrammarHeightCalled] = useState(false)
  const chatWrapperRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const [mistake, setMistake] = useState(-1)

  const [dailyTaskLeft, setDailyTaskLeft] = useState<number>(1)
  const [unAuthuserDailyLimit, setunAuthuserDailyLimit] = useState(1)
  const [dailyReachedLimitDate, setDailyReachedLimitDate] = useState<
    Date | string | undefined
  >()

  const HintShown = useTaskStore(state => state.HintShown)

  const router = useRouter()
  const locale = router.locale
  const { Token } = useUserStore(getUserToken)
  const { data: session } = useSession()

  const { courseName, languageTo, languageFrom, task } = router.query

  // Use localStorage to set the token state
  // useEffect(() => {
  //   fetchUserId()
  //   const getUserId = Cookies.get('userId')
  //   getUserId && setUserId(getUserId)
  // }, [])

  // const fetchUserId = async () => {
  //   if (!languageFrom || !languageTo || !courseName) return

  //   try {
  //     const response = await getUserId({
  //       languageFrom,
  //       languageTo,
  //       courseName,
  //       Token,
  //     })
  //     if (response) {
  //       setUserId(response)
  //       Cookies.set('userId', response)
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user course:', error)
  //   }
  // }


  console.log(languageFrom, languageTo, courseName, Token, userId)

  // useEffect(() => {
  //   if (!languageFrom || !languageTo || !courseName || (!Token && !userId)) {
  //     return
  //   }
  //   const fetchUserCourse = async () => {
  //     await fetchUserId()

  //     try {
  //       const courseObject = await getUserCourse({
  //         languageFrom,
  //         languageTo,
  //         courseName,
  //         Token,
  //         userId,
  //       })
  //       if (courseObject) {
  //         setCurrentCourseObject(courseObject)
  //         setCourseId(courseObject._id)
  //         setUserScore(courseObject.score)
  //         setDailyTaskLeft(courseObject.info.dailyTaskLeft)
  //         setunAuthuserDailyLimit(
  //           courseObject.course.configuration.unAuthUserDailyLimit,
  //         )
  //         setDailyReachedLimitDate(new Date(courseObject.dailyReachedLimitDate))
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user course:', error)
  //     }
  //   }

  //   fetchUserCourse()
  // }, [languageFrom, languageTo, courseName, Token, userId, tab, currentTask])

  // Use the languageFrom, languageTo, courseName, token, and courseId states to get the tasks data
  // useEffect(() => {
  //   if (!languageFrom || !languageTo || !courseName || (!Token && !courseId))
  //     return

  //   getTasks({
  //     languageFrom,
  //     languageTo,
  //     Token,
  //     courseId,
  //     userId,
  //     task,
  //   })
  //     .then(response => setTasksData(response))
  //     .catch(error => {
  //       console.error('Error fetching user course:', error)
  //       throw error
  //     })
  // }, [courseId, courseName])

  //fetch new portion of tasks
  // useEffect(() => {
  //   if (
  //     !languageFrom ||
  //     !languageTo ||
  //     !courseName ||
  //     (!Token && !userId) ||
  //     !courseId ||
  //     !tasksData
  //   )
  //     return
  //   if (currentTaskNumber === tasksData?.length) {
  //     getTasks({
  //       languageFrom,
  //       languageTo,
  //       Token,
  //       courseId,
  //       userId,
  //     })
  //       .then(response => {
  //         const newDataArray = [...tasksData, ...response]
  //         setTasksData(newDataArray)
  //         return response
  //       })
  //       .catch(error => {
  //         console.error('Error fetching user course:', error)
  //         throw error
  //       })
  //   }
  // }, [currentTask])

  // Use the tasksData and currentTaskNumber states to set the current task and its type
  // useEffect(() => {
  //   if (!tasksData) return
  //   setCurrentTask(tasksData[currentTaskNumber])
  // }, [currentTaskNumber, tasksData])

  const handleGrammarHeight = (height: number) => {
    setGrammarHeight(height)
    setIsGrammarHeightCalled(true)
  }

  // useEffect(() => {
  //   if (!chatWrapperRef.current || !chatRef.current) return
  //   if (isGrammarHeightCalled && grammarHeight === 0) return

  //   setTimeout(() => {
  //     if (chatWrapperRef.current && chatRef.current) {
  //       if (grammarHeight !== 0) {
  //         chatRef.current.scrollTop =
  //           chatWrapperRef.current.scrollHeight - grammarHeight
  //         setGrammarHeight(0)
  //       } else {
  //         chatRef.current.scrollTop = chatWrapperRef.current.scrollHeight
  //       }
  //     }
  //   }, 200)

  //   setIsGrammarHeightCalled(false)
  // }, [HintShown, currentTask, isGrammarHeightCalled, currentMessageIndex])

  const arePropsDefined =
    (Token !== undefined || userId !== undefined) &&
    languageTo !== undefined &&
    languageFrom !== undefined &&
    currentTask !== undefined &&
    currentCourseObject !== undefined

  const commonProps = arePropsDefined
    ? {
      userId,
      Token,
      languageTo,
      languageFrom,
      courseId,
      setCurrentTaskNumber,
      currentTaskNumber,
      currentTask,
      completedTasks,
      mistake,
      setCompletedTasks,
      learnMode: currentCourseObject.learnMode,
    }
    : null

  const isUserLoggedIn = !!Token

  return (
    <div>
      <PageHead
        title={'META_TAG_ABOUTCOURSE_TITLE_' + (languageTo || 'geo')}
        description={
          'META_TAG_ABOUTCOURSE_DESCRIPTION_' + (languageTo || 'geo')
        }
        keywords={'META_TAG_ABOUTCOURSE_KEYWORDS_' + (languageTo || 'geo')}
      />
      {openFeedback && currentCourseObject && (
        <Feedback
          setOpenFeedback={() => setOpenFeedback(false)}
          currentCourseObject={currentCourseObject}
          currentTaskData={currentTask}
          screenshotRef={screenshotRef}
          token={Token}
          UserEmail={session?.user.email}
          locale={locale}
        />
      )}
      <div className={style.container} ref={screenshotRef}>
        <Header
          size="s"
          currentCourseObject={currentCourseObject}
          token={Token}
          setShowTopScores={setShowTopScores}
          showTopScores={showTopScores}
        />
        <CombinedModalComponent
          token={Token}
          courseName={courseName}
          courseId={courseId}
          isUserLoggedIn={isUserLoggedIn}
          completedTasks={completedTasks}
          unAuthuserDailyLimit={unAuthuserDailyLimit}
          languageTo={languageTo}
          languageFrom={languageFrom}
          dailyTaskLeft={dailyTaskLeft}
          currentCourseObject={currentCourseObject}
          dailyReachedLimitDate={dailyReachedLimitDate}
        />
        {isSoundChecked && currentCourseObject && Token && (
          <Ratings
            userCourseId={currentCourseObject?._id}
            courseId={currentCourseObject?.course._id}
            userScore={userScore}
            token={Token}
            showTopScores={showTopScores}
          />
        )}
        <BackgroundParrot />
        <FeedbackButton
          setOpenFeedback={setOpenFeedback}
          openFeedback={openFeedback}
        />
        {!isSoundChecked && (
          <SoundCheck
            setSoundChecked={setSoundChecked}
            soundChecked={isSoundChecked}
          />
        )}

        {isSoundChecked && currentCourseObject && (
          <>
            <LearnMenu
              languageTo={languageTo}
              languageFrom={languageFrom}
              token={Token}
              languageCourseId={currentCourseObject.course._id}
              languageId={currentCourseObject.course.iLearn._id}
              setTab={setTab}
              tab={tab}
            />
            <div className={style.content}>
              {currentCourseObject && (
                <ProgressBar
                  currentCourseObject={currentCourseObject}
                  userScore={userScore}
                />
              )}
              {tab !== 'course' && currentCourseObject && (
                <Wrapper
                  token={Token ?? ''}
                  currentCourseObject={currentCourseObject}
                  languageFrom={languageFrom}
                  tab={tab}
                  setTab={setTab}
                />
              )}
              {tab === 'course' && (
                <div className={style.chatContainer}>
                  <div className={style.chat} ref={chatRef}>
                    <div ref={chatWrapperRef} className={style.chatWrapper}>
                      {completedTasks && (
                        <ChatHistory completedTasks={completedTasks} />
                      )}
                      {currentTask && currentCourseObject && (
                        <ChatCurrentTask
                          currentTask={currentTask}
                          currentMessageIndex={currentMessageIndex}
                          onDivHeight={handleGrammarHeight}
                          mistakesByLevel={getLevelColors({
                            currentTask: currentTask,
                            currentCourseObject: currentCourseObject,
                          })}
                        />
                      )}
                      {!currentTask && <div className={style.blankBubble} />}
                    </div>
                  </div>
                  {/* {commonProps && ( */}
                  <CurrentTaskInput
                    commonProps={commonProps}
                    currentMessageIndex={currentMessageIndex}
                    setCurrentMessageIndex={setCurrentMessageIndex}
                  />
                  {/* )} */}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Lessons

   /** განიხილება შემდეგი პირობით ( ფუნქციას მოეწოდება 1 სიტყვა და არა წინდადება ) */
    // const voiceHandler = (str: string) => {


    //     /** როცა ვოსის დაბრუნებულ სტრინგში მხოლოს სფეისებია ან უბრალოდ არაფერი წერია */
    //     if (str.trim().length === 0) {
    //         return;
    //     }

    //     const vars = initialValues(task); // საჭირო რეფერენსები task ობიექტის

    //     /** თუ ობიექტიდან არ არის საჭირო ინფო  */
    //     if (!vars) {
    //         return
    //     }

    //     const { wordsObject, wordIndex, wordObj, word, letters, charIndex, char, lastCharObj, lastChar } = vars;

    //     let hintWord = char === ' ' ? 'გამოტოვება' : word;

    //     /** 
    //      * თუ წინა სიტყვიდან სფეისია დარჩენილი და ვოისით სიტყვა შეიყვანა , 
    //      * მიმდინარე სიტყვას ავტომატურად უნდა დაემატოს სფეისი წესით და მიმდინარეს
    //      * სტატუს უნდა გადაეცეს შემდეგ სიტყვას .
    //      * 
    //      * */
    //     if (char === ' ') {

    //         task.wordsAudio.progress = key + ' '; // პროგრესის დასეტვა ობიექტში
    //         setKey(task.wordsAudio.progress); // მიმდინარე პროგრესის განახლება 

    //         /** მიმდინარე სიტყვის ობიექტში წარმატების ინდიკატორი ველების დააფდეითება */
    //         wordObj.error = false;
    //         wordObj.done = true;

    //         wordsObject.current++; // მიმდინარე სიტყვის ინდექსი გაიზრდება ერთით (გადავა შემდეგ სიტყვაზე)

    //         /** 
    //          * თუ შესაყვანი სიტყვის ზომა მეტია ვიდრე შეყვანილი სიტყვის
    //          * თუ შეყვანილი სიტყვის ბოლო სიმბოლოს მერე კიდევ გვაქ სიმბოლო 
    //          *              რომელსაც გააჩნია auto : true  მონაცემი . 
    //          * 
    //          * შედეგი : 
    //          * 
    //          *    შეყვანილ სიტყვას მიეწებება 1 ავტომატური სიმბოლო არსებობის შემთხვევაში 
    //          *   
    //          * 
    //          * 
    //          * მაგ .  Peter     =>   Peter.   
    //          *        Hallo    =>   Hallo!
    //          * i
    //          */

    //         if ( 
    //             word.length > str.length &&
    //             letters[str.length].auto
    //         ) {
    //             str = str + wordObj.letters.all[str.length].char
    //         }

    //         hintWord = char === ' ' ? 'გამოტოვება' : word;
    //     }


    //     /** თუ ვოისის სიტყვა და მიმდინარე სიტყვა დაემთხვა */
    //     if (str.trim().toLocaleLowerCase() === word.trim().toLocaleLowerCase()) {
    //         SetHintShow(false);


    //         updateTaskFields('currentWordIsDone', true); // მიმდინარე სიტყვას დასრულებული სტატუსი მიენიჭა
    //         updateTaskFields('currentWordHasError', false); // მიმდინარე სიტყვა შესრულებულია და არა დაერორებული

    //         // letters.map((item: any) => ({ ...item, done: true }));
    //         letters.map((item: any) => lastKeyHandler(item.char));


    //         /** ვოისით შეყვანილი სიტყვის current ობიექტის აფდეითი */
    //         // const lastOneIndex = wordObj.letters.all.length - 1;
    //         // wordObj.letters.current = {
    //         //     index: lastOneIndex,
    //         //     char: wordObj.letters.all[lastOneIndex].char
    //         // }


    //         // /** 
    //         //  * წესით სფეისი ყველა ვარიანტში დაჭირდება ახალ სიტყვის წინ მაგრამ მაინც.
    //         //  * აქ ოპტიმიზაციისთვის დაწერა შეიძლება თუ ბოლო სიტყვაა რაც ვოისით შევიყვანეთ
    //         //  * სფეისი რო აღარ მიწებოს აღარ ვწერ უბრალოდ მაგას .
    //         //  */

    //         const progressStrToArr = task.wordsAudio.progress.split(' ');

    //         if (wordIndex === progressStrToArr.length - 1) {
    //             progressStrToArr.pop();
    //             updateTaskFields('progress', progressStrToArr.join(' '));
    //         }


    //         task.wordsAudio.progress = lastChar === ' ' ? task.wordsAudio.progress + word + ' ' : task.wordsAudio.progress + word;

    //         setKey(task.wordsAudio.progress)


    //         // /** თუ მიმდინარე სიტყვის შესრულების შემდეგ  , კიდევ გვაქ სხვა სიტყვა */
    //         if (words.data.length >= words.current + 2) {

    //             words.current++; // მიმდინარე სიტყვის ინდექსი გაიზრდება ერთით (გადავა შემდეგ სიტყვაზე)

    //             const nextWordObj = words.data[words.current]; // შემდეგი სიტყვის ობიექტი
    //             const nextWordsFirstLetter = nextWordObj.letters.all[0].char; // შემდეგი სიტყვის პირველი სიმბოლო
    //             const nextWordsFirstLetterIsAuto = nextWordObj.letters.all[0].auto; // შემდეგი სიტყვის პირველი სიმბოლო

    //             /** მინიშნების განახლება 
    //              *  თუ შემდეგი სიტყვის პირველი სიმბოლო space იქნება , მინიშნება გახდება 'გამოტოვება'
    //              *  სხვა შემთხვევაში მინიშნება გახდება შემდეგი სიტყვა
    //              */
    //             hintWord = nextWordsFirstLetter === ' ' ? 'გამოტოვება' : nextWordObj.word
    //             SetHintText(hintWord);


    //             if (nextWordsFirstLetterIsAuto) {


    //                 wordObj.error = false; // მიმდინარე სიტყვა წარმატებით შესრულდა
    //                 wordObj.done = true; // მიმდინარე სიტყვა წარმატებით შესრულდა

    //                 /** ვოისით შეყვანილი სიტყვის ყველა სიმბოლოს ობიექტის 'done' ველის დააფდეითება */
    //                 wordObj.letters.all = wordObj.letters.all.map((item: any) => ({ ...item, done: true }));

    //                 /** ვოისით შეყვანილი სიტყვის current ობიექტის აფდეითი */
    //                 const lastOneIndex2 = wordObj.letters.all.length - 1;
    //                 wordObj.letters.current = {
    //                     index: lastOneIndex2,
    //                     char: wordObj.letters.all[lastOneIndex2].char
    //                 }

    //                 lastChar = wordObj.letters.all[wordObj.letters.all.length - 1].char; // სიტყვის ბოლო სიმბოლო ( string / char )

    //                 task.wordsAudio.progress = lastChar === ' ' ? task.wordsAudio.progress + word + ' ' : task.wordsAudio.progress + word;

    //                 setKey(task.wordsAudio.progress)


    //                 if (words.data.length >= words.current + 2) {

    //                     words.current++; // მიმდინარე სიტყვის ინდექსი გაიზრდება ერთით (გადავა შემდეგ სიტყვაზე)


    //                     const nextWordObj = words.data[words.current]; // შემდეგი სიტყვის ობიექტი
    //                     const nextWordsFirstLetter = nextWordObj.letters.all[0].char; // შემდეგი სიტყვის პირველი სიმბოლო
    //                     const nextWordsFirstLetterIsAuto = nextWordObj.letters.all[0].auto; // შემდეგი სიტყვის პირველი სიმბოლო

    //                     /** მინიშნების განახლება 
    //                      *  თუ შემდეგი სიტყვის პირველი სიმბოლო space იქნება , მინიშნება გახდება 'გამოტოვება'
    //                      *  სხვა შემთხვევაში მინიშნება გახდება შემდეგი სიტყვა
    //                      */
    //                     hintWord = nextWordsFirstLetter === ' ' ? 'გამოტოვება' : nextWordObj.word
    //                     SetHintText(hintWord);
    //                 }
    //             }
    //         } else {

    //             /** დასრულების შეტყობინება , რეალურ პროექტში წესით ახალი წინადადების მოთხოვნა იგზავნება */
    //             // setShopInput(false); // დასრულების დროს Input გაქრება


    //             /** თუ მიმდინარე სიტყვა დასრულდა და ეს იყო ბოლო სიტყვა ( წინადადების დასასრული ) */

    //             /** მიმდინარე სიტყვის ობიექტის განახლება */
    //             wordObj.error = false; // მიმდინარე სიტყვა წარმატებით შესრულდა
    //             wordObj.done = true; // მიმდინარე სიტყვა წარმატებით შესრულდა
    //             wordObj.letters.all[charIndex].done = true; // მიმდინარე სიმბოლო წარმატებით შესრულდა

    //             setMistakeCount(0); // დაშვებული შეცდომის განულება შემდეგი ტასკისთვის



    //             saveTask({
    //                 ...commonProps,
    //                 // courseId: task.course._id,
    //                 currentTask: { ...task, taskType: task.taskType.nameCode },
    //                 totalMistakes: mistakeCount,
    //                 forgivenErrorQuantity: 0,
    //                 error: 0,
    //             }).then(res => {

    //                 setKey('');

    //                 if (completedTasks.findIndex((item: TaskData) => item.id === task._id) !== 1) {
    //                     setCompletedTasks(completedTasks.length > 0 ? [...completedTasks, data] : [data]);

    //                     if (task.ordinalNumber < 5) {
    //                         setCurrentTaskNumber(task.ordinalNumber);
    //                     } else {
    //                         getTasksHandler();
    //                     }
    //                 }
    //                 return;
    //             }).catch(err => {
    //                 console.log(err);
    //             })
    //         }


    //     } else {

    //         /** თუ მომხმარებელმა შეიყვანა არასწორი სიტყვა */

    //         setMistakeCount(prev => prev + 1)


    //         /** სიტყვის ობიექტის განახლება */
    //         wordObj.error = true; // მიმდინარე სიტყვა არ არის დასრულებული და გვაქ შეცდომა

    //         SetHintText(hintWord); // განახლდება მინიშნების სიტყვა შეცდომის შემთხვევაში
    //         SetHintShow(true) // გაიხსნება მინიშნება  , მომხმარებლის დასახმარებლად
    //     }

    // }


   /** განიხილება შემდეგი პირობით ( ფუნქციას მოეწოდება 1 სიტყვა და არა წინდადება ) */
    //   const voiceHandler = (str: string) => {


    //     /** როცა ვოსის დაბრუნებულ სტრინგში მხოლოს სფეისებია ან უბრალოდ არაფერი წერია */
    //     if (str.trim().length === 0) {
    //         return;
    //     }

    //     // const vars = initialValues(task); // საჭირო რეფერენსები task ობიექტის

    //     // /** თუ ობიექტიდან არ არის საჭირო ინფო  */
    //     // if (!vars) {
    //     //     return
    //     // }

    //     // const { wordIndex, wordObj, word, letters, charIndex, char, lastCharObj, lastChar } = vars;


    //     const words = task.wordsAudio.words;

    //     let wordIndex = words.current; // მიმდინარე სიტყვის ინდექსი
    //     let wordObj = words.data[wordIndex]; // მიმდინარე სიტყვის ობიექტი
    //     let word = wordObj.word; // მიმდინარე სიტყვა (string)

    //     let charIndex = wordObj.letters.current.index; // მიმდინარე სიმბოლოს ინდექსი
    //     let char = wordObj.letters.all[charIndex].char; // მიმდინარე სიმბოლო ( string / char )
    //     let lastChar = wordObj.letters.all[wordObj.letters.all.length - 1].char; // სიტყვის ბოლო სიმბოლო ( string / char )



    //     let lettersArr = wordObj.letters.all;

    //     if (
    //         word.length > str.length &&
    //         lettersArr[str.length].auto
    //     ) {
    //         str = str + wordObj.letters.all[str.length].char
    //     }






    //     /**
    //      * მინიშნება : 
    //      * 
    //      * ცვლადის საწყისი მნიშვნელობა იქნება მიმდინარე სიტყვა, 
    //      * შემდეგ ნაბიჯებზე მოხდება ამ სიტყვის ოპტიმიზაცია და შემდეგ დაისეტება state - ში
    //      */
    //     let hintWord = char === ' ' ? 'გამოტოვება' : word;

    //     /** 
    //      * თუ წინა სიტყვიდან სფეისია დარჩენილი და ვოისით სიტყვა შეიყვანა , 
    //      * მიმდინარე სიტყვას ავტომატურად უნდა დაემატოს სფეისი წესით და მიმდინარეს
    //      * სტატუს უნდა გადაეცეს შემდეგ სიტყვას .
    //      * 
    //      * */
    //     if (char === ' ') {

    //         task.wordsAudio.progress = key + ' '; // პროგრესის დასეტვა ობიექტში
    //         setKey(task.wordsAudio.progress); // მიმდინარე პროგრესის განახლება 

    //         /** მიმდინარე სიტყვის ობიექტში წარმატების ინდიკატორი ველების დააფდეითება */
    //         wordObj.error = false;
    //         wordObj.done = true;

    //         words.current++; // მიმდინარე სიტყვის ინდექსი გაიზრდება ერთით (გადავა შემდეგ სიტყვაზე)

    //         /** 
    //          * აქ უკვე გვიწევს ფუნქციის თავში განსაზღვრული ცვლადების დააფდეითება, 
    //          * ახალი 'მიმდინარე' სტატუს მქონე სიტყვის მოსანიშნად. 
    //          * 
    //          * 
    //          * რადგან words რეფერენს ტიპის ცვლადია შემდეგი ხაზიდან უკვე ახალი სიტყვის მნიშვნელობები 
    //          * ექნება ცვლადებს და არ განმეორდება იგივე სიტყვა იგივე ცვლადზე მიმართვის გამო
    //          * 
    //          * */


    //         wordIndex = words.current; // მიმდინარე სიტყვის ინდექსი
    //         wordObj = words.data[wordIndex]; // მიმდინარე სიტყვის ობიექტი
    //         word = wordObj.word; // მიმდინარე სიტყვა (string)

    //         charIndex = wordObj.letters.current.index; // მიმდინარე სიმბოლოს ინდექსი
    //         char = wordObj.letters.all[charIndex].char; // მიმდინარე სიმბოლო ( string / char )
    //         lastChar = wordObj.letters.all[wordObj.letters.all.length - 1].char; // სიტყვის ბოლო სიმბოლო ( string / char )



    //         /** 
    //          * თუ შესაყვანი სიტყვის ზომა მეტია ვიდრე შეყვანილი სიტყვის
    //          * თუ შეყვანილი სიტყვის ბოლო სიმბოლოს მერე კიდევ გვაქ სიმბოლო 
    //          *              რომელსაც გააჩნია auto : true  მონაცემი . 
    //          * 
    //          * შედეგი : 
    //          * 
    //          *    შეყვანილ სიტყვას მიეწებება 1 ავტომატური სიმბოლო არსებობის შემთხვევაში 
    //          *   
    //          * 
    //          * 
    //          * მაგ .  Peter     =>   Peter.   
    //          *        Hallo    =>   Hallo!
    //          * 
    //          */



    //         lettersArr = wordObj.letters.all;

    //         if (
    //             word.length > str.length &&
    //             lettersArr[str.length].auto
    //         ) {
    //             str = str + wordObj.letters.all[str.length].char
    //         }

    //         hintWord = char === ' ' ? 'გამოტოვება' : word;
    //     }

    //     /** თუ ვოისის სიტყვა და მიმდინარე სიტყვა დაემთხვა */
    //     if (str.trim().toLocaleLowerCase() === word.trim().toLocaleLowerCase()) {
    //         SetHintShow(false);



    //         wordObj.error = false; // მიმდინარე სიტყვა წარმატებით შესრულდა
    //         wordObj.done = true; // მიმდინარე სიტყვა წარმატებით შესრულდა

    //         /** ვოისით შეყვანილი სიტყვის ყველა სიმბოლოს ობიექტის 'done' ველის დააფდეითება */
    //         wordObj.letters.all = wordObj.letters.all.map((item: any) => ({ ...item, done: true }));

    //         /** ვოისით შეყვანილი სიტყვის current ობიექტის აფდეითი */
    //         const lastOneIndex = wordObj.letters.all.length - 1;
    //         wordObj.letters.current = {
    //             index: lastOneIndex,
    //             char: wordObj.letters.all[lastOneIndex].char
    //         }


    //         // /** 
    //         //  * წესით სფეისი ყველა ვარიანტში დაჭირდება ახალ სიტყვის წინ მაგრამ მაინც.
    //         //  * აქ ოპტიმიზაციისთვის დაწერა შეიძლება თუ ბოლო სიტყვაა რაც ვოისით შევიყვანეთ
    //         //  * სფეისი რო აღარ მიწებოს აღარ ვწერ უბრალოდ მაგას .
    //         //  */

    //         const progressStrToArr = task.wordsAudio.progress.split(' ');

    //         if (wordIndex === progressStrToArr.length - 1) {
    //             progressStrToArr.pop();
    //             task.wordsAudio.progress = progressStrToArr.join(' ') + ' ';
    //         }


    //         task.wordsAudio.progress = lastChar === ' ' ? task.wordsAudio.progress + word + ' ' : task.wordsAudio.progress + word;

    //         setKey(task.wordsAudio.progress)


    //         // /** თუ მიმდინარე სიტყვის შესრულების შემდეგ  , კიდევ გვაქ სხვა სიტყვა */
    //         if (words.data.length >= words.current + 2) {

    //             words.current++; // მიმდინარე სიტყვის ინდექსი გაიზრდება ერთით (გადავა შემდეგ სიტყვაზე)

    //             const nextWordObj = words.data[words.current]; // შემდეგი სიტყვის ობიექტი
    //             const nextWordsFirstLetter = nextWordObj.letters.all[0].char; // შემდეგი სიტყვის პირველი სიმბოლო
    //             const nextWordsFirstLetterIsAuto = nextWordObj.letters.all[0].auto; // შემდეგი სიტყვის პირველი სიმბოლო

    //             /** მინიშნების განახლება 
    //              *  თუ შემდეგი სიტყვის პირველი სიმბოლო space იქნება , მინიშნება გახდება 'გამოტოვება'
    //              *  სხვა შემთხვევაში მინიშნება გახდება შემდეგი სიტყვა
    //              */
    //             hintWord = nextWordsFirstLetter === ' ' ? 'გამოტოვება' : nextWordObj.word
    //             SetHintText(hintWord);


    //             if (nextWordsFirstLetterIsAuto) {


    //                 wordObj.error = false; // მიმდინარე სიტყვა წარმატებით შესრულდა
    //                 wordObj.done = true; // მიმდინარე სიტყვა წარმატებით შესრულდა

    //                 /** ვოისით შეყვანილი სიტყვის ყველა სიმბოლოს ობიექტის 'done' ველის დააფდეითება */
    //                 wordObj.letters.all = wordObj.letters.all.map((item: any) => ({ ...item, done: true }));

    //                 /** ვოისით შეყვანილი სიტყვის current ობიექტის აფდეითი */
    //                 const lastOneIndex2 = wordObj.letters.all.length - 1;
    //                 wordObj.letters.current = {
    //                     index: lastOneIndex2,
    //                     char: wordObj.letters.all[lastOneIndex2].char
    //                 }

    //                 lastChar = wordObj.letters.all[wordObj.letters.all.length - 1].char; // სიტყვის ბოლო სიმბოლო ( string / char )

    //                 task.wordsAudio.progress = lastChar === ' ' ? task.wordsAudio.progress + word + ' ' : task.wordsAudio.progress + word;

    //                 setKey(task.wordsAudio.progress)


    //                 if (words.data.length >= words.current + 2) {

    //                     words.current++; // მიმდინარე სიტყვის ინდექსი გაიზრდება ერთით (გადავა შემდეგ სიტყვაზე)


    //                     const nextWordObj = words.data[words.current]; // შემდეგი სიტყვის ობიექტი
    //                     const nextWordsFirstLetter = nextWordObj.letters.all[0].char; // შემდეგი სიტყვის პირველი სიმბოლო
    //                     const nextWordsFirstLetterIsAuto = nextWordObj.letters.all[0].auto; // შემდეგი სიტყვის პირველი სიმბოლო

    //                     /** მინიშნების განახლება 
    //                      *  თუ შემდეგი სიტყვის პირველი სიმბოლო space იქნება , მინიშნება გახდება 'გამოტოვება'
    //                      *  სხვა შემთხვევაში მინიშნება გახდება შემდეგი სიტყვა
    //                      */
    //                     hintWord = nextWordsFirstLetter === ' ' ? 'გამოტოვება' : nextWordObj.word
    //                     SetHintText(hintWord);
    //                 }
    //             }
    //         } else {

    //             /** დასრულების შეტყობინება , რეალურ პროექტში წესით ახალი წინადადების მოთხოვნა იგზავნება */
    //             // setShopInput(false); // დასრულების დროს Input გაქრება


    //             /** თუ მიმდინარე სიტყვა დასრულდა და ეს იყო ბოლო სიტყვა ( წინადადების დასასრული ) */

    //             /** მიმდინარე სიტყვის ობიექტის განახლება */
    //             wordObj.error = false; // მიმდინარე სიტყვა წარმატებით შესრულდა
    //             wordObj.done = true; // მიმდინარე სიტყვა წარმატებით შესრულდა
    //             wordObj.letters.all[charIndex].done = true; // მიმდინარე სიმბოლო წარმატებით შესრულდა

    //             setMistakeCount(0); // დაშვებული შეცდომის განულება შემდეგი ტასკისთვის



    //             saveTask({
    //                 ...commonProps,
    //                 // courseId: task.course._id,
    //                 currentTask: { ...task, taskType: task.taskType.nameCode },
    //                 totalMistakes: mistakeCount,
    //                 forgivenErrorQuantity: 0,
    //                 error: 0,
    //             }).then(res => {

    //                 setKey('');

    //                 if (completedTasks.findIndex((item: TaskData) => item.id === task._id) !== 1) {
    //                     setCompletedTasks(completedTasks.length > 0 ? [...completedTasks, data] : [data]);

    //                     if (task.ordinalNumber < 5) {
    //                         setCurrentTaskNumber(task.ordinalNumber);
    //                     } else {
    //                         getTasksHandler();
    //                     }
    //                 }
    //                 return;
    //             }).catch(err => {
    //                 console.log(err);
    //             })
    //         }


    //     } else {

    //         /** თუ მომხმარებელმა შეიყვანა არასწორი სიტყვა */

    //         setMistakeCount(prev => prev + 1)


    //         /** სიტყვის ობიექტის განახლება */
    //         wordObj.error = true; // მიმდინარე სიტყვა არ არის დასრულებული და გვაქ შეცდომა

    //         SetHintText(hintWord); // განახლდება მინიშნების სიტყვა შეცდომის შემთხვევაში
    //         SetHintShow(true) // გაიხსნება მინიშნება  , მომხმარებლის დასახმარებლად
    //     }

    // }




    // const lastKeyHandler = (str: string) => {

    //     /** key  უნდა იყოს 1 სიმბოლო  (მაგ. 'Tab') */
    //     if (key.length != 1) {
    //         return
    //     }

    //     const vars = initialValues(task); // საჭირო რეფერენსები task ობიექტის

    //     /** თუ ობიექტიდან არ არის საჭირო ინფო  */
    //     if (!vars) {
    //         return
    //     }

    //     const { wordIndex, wordObj, word, charIndex, char } = vars;

    //     // const wordIndex = words.current; // მიმდინარე სიტყვის ინდექსი
    //     // const wordObj = words.data[wordIndex]; // მიმდინარე სიტყვის ობიექტი
    //     // const word = wordObj.word; // მიმდინარე სიტყვა (string)

    //     // const charIndex = wordObj.letters.current.index; // მიმდინარე სიმბოლოს ინდექსი
    //     // const charObj = wordObj.letters.all[charIndex];
    //     // const char = charObj.char; // მიმდინარე სიმბოლო ( string / char )


    //     /**
    //      * მინიშნება : 
    //      * 
    //      * ცვლადის საწყისი მნიშვნელობა იქნება მიმდინარე სიტყვა, 
    //      * შემდეგ ნაბიჯებზე მოხდება ამ სიტყვის ოპტიმიზაცია და შემდეგ დაისეტება state - ში
    //      */
    //     let hintWord = char === ' ' ? 'გამოტოვება' : word;


    //     /** თუ მიმდინარე სიმბოლო დაემთხვევა შეყვანილ სიმბოლოს */
    //     if (key.toLocaleLowerCase() === char.toLocaleLowerCase()) {

    //         // SetHintText(hintWord)
    //         SetHintShow(false);
    //         // setShowHint(false) // მინიშნების (hint) სიტყვა უნდა დაიხუროს  , სწორად გაცემული პასუხის დროს
    //         if (wordIndex === 0 && charIndex === 0) {
    //             setKey(char);
    //         } else {
    //             setKey(prev => prev + char);
    //         }
    //         // პროგრესს დაემატება ახალი სიმბოლო საჭირო რეგისტრში
    //         task.wordsAudio.progress = key + char; // პროგრესის დასეტვა ობიექტში


    //         /** შემდეგი გამოსაცნობი სიმბოლო სიტყვაში */
    //         const nextChar = wordObj.length >= charIndex + 2 ? wordObj.letters.all[charIndex + 1] : null;

    //         /** თუ მიმდინარე სიტყვაში მოიძებნა შემდეგი სიმბოლო */
    //         if (nextChar) {


    //             /** თუ შემდეგი სიმბოლო არის space , hintWord (მინიშნება განახლდება) სხვა შემთხვევაში დარჩება */
    //             if (nextChar.char === ' ') {
    //                 hintWord = 'გამოტოვება'
    //             }


    //             /** task ობიექტში შესაბამისი ველების მნიშვნელობების განახლება */
    //             wordObj.letters.current.index = charIndex + 1;  // შემდეგ სიმბოლოზე გადასვლა
    //             wordObj.letters.current.char = nextChar.char; // შემდეგი სიმბოლო 
    //             wordObj.letters.all[charIndex].done = true; // მიმდინარე სიმბოლო წარმატებით შესრულდა

    //             /** შემდეგი სიმბოლო თუ ავტომატურად უნდა მიებას , ფუნქცია იძახევს თავის თავს */
    //             if (nextChar.auto) {
    //                 key = nextChar.char;
    //                 lastKeyHandler(key);
    //             }

    //         } else if (words.data.length >= words.current + 2) {
    //             /** თუ შეყვანილი სიმბოლოთი დასრულდა მიმდინარე სიტყვა და გვაქს შემდეგი სიტყვაც */

    //             wordObj.error = false; // მიმდინარე სიტყვა წარმატებით შესრულდა
    //             wordObj.done = true; // მიმდინარე სიტყვა წარმატებით შესრულდა
    //             wordObj.letters.all[charIndex].done = true; // მიმდინარე სიმბოლო წარმატებით შესრულდა


    //             words.current++; // მიმდინარე სიტყვის ინდექსი გაიზრდება ერთით (გადავა შემდეგ სიტყვაზე)

    //             const nextWordObj = words.data[words.current]; // შემდეგი სიტყვის ობიექტი
    //             const nextWordsFirstLetter = nextWordObj.letters.all[0].char; // შემდეგი სიტყვის პირველი სიმბოლო

    //             /** მინიშნების განახლება 
    //              *  თუ შემდეგი სიტყვის პირველი სიმბოლო space იქნება , მინიშნება გახდება 'გამოტოვება'
    //              *  სხვა შემთხვევაში მინიშნება გახდება შემდეგი სიტყვა
    //              */
    //             hintWord = nextWordsFirstLetter === ' ' ? 'გამოტოვება' : nextWordObj.word

    //         } else {

    //             /** თუ მიმდინარე სიტყვა დასრულდა და ეს იყო ბოლო სიტყვა ( წინადადების დასასრული ) */

    //             /** მიმდინარე სიტყვის ობიექტის განახლება */
    //             wordObj.error = false; // მიმდინარე სიტყვა წარმატებით შესრულდა
    //             wordObj.done = true; // მიმდინარე სიტყვა წარმატებით შესრულდა
    //             wordObj.letters.all[charIndex].done = true; // მიმდინარე სიმბოლო წარმატებით შესრულდა

    //             setMistakeCount(0); // დაშვებული შეცდომის განულება შემდეგი ტასკისთვის


    //             saveTask({
    //                 ...commonProps,
    //                 // courseId: task.course._id,
    //                 currentTask: { ...task, taskType: task.taskType.nameCode },
    //                 totalMistakes: mistakeCount,
    //                 forgivenErrorQuantity: 0,
    //                 error: 0,
    //             }).then(res => {

    //                 setKey('');

    //                 if (completedTasks.findIndex((item: TaskData) => item.id === task._id) !== 1) {
    //                     setCompletedTasks(completedTasks.length > 0 ? [...completedTasks, data] : [data]);

    //                     if (task.ordinalNumber < 5) {
    //                         setCurrentTaskNumber(task.ordinalNumber);
    //                     } else {
    //                         getTasksHandler();
    //                     }
    //                 }

    //                 return;
    //             }).catch(err => {
    //                 console.log(err);
    //             })

    //             /** დასრულების შეტყობინება , რეალურ პროექტში წესით ახალი წინადადების მოთხოვნა იგზავნება */
    //             // setShopInput(false); // დასრულების დროს Input გაქრება
    //         }

    //         // setHint(hintWord); // განახლდება მინიშნების სიტყვა სწორად შეყვანილი სიმბოლოს შესაბამისად
    //     } else {

    //         setMistakeCount(prev => prev + 1)


    //         /** თუ მომხმარებელმა შეიყვანა არასწორი სიმბოლო */

    //         /** სიტყვის ობიექტის განახლება */
    //         wordObj.error = true; // მიმდინარე სიტყვა არ არის დასრულებული და გვაქ შეცდომა
    //         wordObj.letters.all[charIndex].error++; // მიმდინარე სიმბოლოზე გაიზრდება შეცდომების რაოდენობა


    //         SetHintText(hintWord)
    //         SetHintShow(true);

    //         // setHint(hintWord); // განახლდება მინიშნების სიტყვა შეცდომის შემთხვევაში
    //         // setShowHint(true) // გაიხსნება მინიშნება  , მომხმარებლის დასახმარებლად
    //     }
    // }




