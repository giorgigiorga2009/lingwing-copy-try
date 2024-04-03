import { PageHead } from '@components/PageHead';
import { Header } from '@components/header/Header';
import { SoundCheck } from '@components/lessons/SoundCheck';
import Ratings from '@components/lessons/usersRating/Ratings';
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import style from '../lessons.module.scss'
import FeedbackButton from '@components/lessons/combinedModals/FeedbackButton';
import BackgroundParrot from '@components/shared/BackgroundParrot';
import LearnMenu from '@components/lessons/learnMenu/LearnMenu';
import { CourseObject, TaskData, getTasks, getUserCourse } from '@utils/lessons/getTask';
import { ParsedUrlQuery } from 'querystring';
import { useSession } from 'next-auth/react';
import { getUserId } from '@utils/getUserId';
import Cookies from 'js-cookie';
import Feedback from '@components/lessons/combinedModals/Feedback';
import ProgressBar from '@components/lessons/ProgressBar';
import Wrapper from '@components/lessons/learnMenu/Wrapper';
import CombinedModalComponent from '@components/lessons/combinedModals/combinedModals';
import ChatHistory from '@components/lessons/ChatHistory';
import CurrentTaskInput from '@components/lessons/CurrentTaskInput';
import ChatCurrentTask from '@components/lessons/ChatCurrentTask';
import { getLevelColors } from '@utils/lessons/taskInputUtils';
import TaskWrapper from '@components/lessons/chat/TaskWrapper';


const Lessons = () => {

    const screenshotRef = useRef<HTMLDivElement>(null)
    const chatWrapperRef = useRef<HTMLDivElement>(null)
    const chatRef = useRef<HTMLDivElement>(null)

    const router = useRouter();
    const { query, locale } = router;
    const { slug, languageTo, languageFrom, courseName, task } = query as ParsedUrlQuery;
    const { data: session } = useSession()
    const user = session?.user;
    const Token = user?.accessToken;


    const [courseObj, setCourseObj] = useState<CourseObject>()
    const [showFeedBack, setShowFeedBack] = useState<boolean>(false);
    const [showTopScores, setShowTopScores] = useState<boolean>(true)

    /** პოტენციურად ტასკები ცალკე კომპონენტში დაივრაპება */
    const [tasksData, setTasksData] = useState<TaskData[]>([])
    const [currentTaskNumber, setCurrentTaskNumber] = useState<number>(0)
    const [currentTask, setCurrentTask] = useState<TaskData>();
    const [completedTasks, setCompletedTasks] = useState<TaskData[]>([]);

    const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0)

    const [grammarHeight, setGrammarHeight] = useState<number>(0)
    const [isGrammarHeightCalled, setIsGrammarHeightCalled] = useState<boolean>(false)

    // Extracting query string
    const queryStr = (() => {
        if (typeof router.asPath === 'string') {
            const queryStringIndex = router.asPath.indexOf('?');
            if (queryStringIndex !== -1) {
                return router.asPath.substring(queryStringIndex + 1).trim();
            }
        }
        return '';
    })();


    /** კურსის ობიექტის წამოღება */
    const getCourseObj = useCallback(async (user_id: string) => {

        try {
            if (languageFrom && languageTo && courseName) {
                const data = await getUserCourse({
                    languageFrom,
                    languageTo,
                    courseName,
                    Token: Token || null,
                    userId: user_id
                });

                return data || null;
            }


        } catch (error) {
            console.error('Error fetching user course:', error);
        }
    }, [languageFrom, languageTo, courseName, Token]);


    /** ტასკების  წამოღება */
    const getTasksList = useCallback(async (user_id: string, course: CourseObject) => {
        try {
            if (languageFrom && languageTo && courseName) {


                const tasks = await getTasks({
                    languageFrom,
                    languageTo,
                    Token: Token || null,
                    courseId: course._id,
                    userId: user_id,
                    task
                })

                if (tasks) {

                    setTasksData(tasks);
                    setCurrentTask(tasks[0])
                    setCurrentTaskNumber(0);
                }

                setCourseObj(course);
            }


        } catch (error) {
            console.error('Error fetching user course:', error);
        }
    }, [languageFrom, languageTo, courseName, setCurrentTaskNumber, Token, task]);


    /** პრე რექვესტი    */
    const fetchUserId = useCallback(async () => {

        try {
            if (languageFrom && languageTo && courseName) {

                /** Step ( Request ) 1  */
                const userId = await getUserId({
                    languageFrom,
                    languageTo,
                    courseName,
                    Token: Token || ''
                });

                if (userId) {

                    /** Step ( Request  ) 2 */
                    Cookies.set('userId', userId);
                    const courseOb = await getCourseObj(userId);


                    if (courseOb && (Token || userId)) {

                        getTasksList(userId, courseOb);
                    }

                }

            }

        } catch (error) {
            console.error('Error fetching user course:', error);
        }
    }, [languageFrom, languageTo, courseName, Token, getCourseObj, getTasksList]);


    /** კომპონენტის ჩატვირთვის დროს და query string - ის ცვლილების დროს გაიგზავნება რექვესტი */
    useEffect(() => {
        fetchUserId()
    }, [fetchUserId, router.query])



    const handleGrammarHeight = (height: number) => {
        setGrammarHeight(height)
        setIsGrammarHeightCalled(true)

        if (chatWrapperRef.current && chatRef.current) {
            if (grammarHeight !== 0) {
                chatRef.current.scrollTop =
                    chatWrapperRef.current.scrollHeight - height
                setGrammarHeight(0)
            } else {
                chatRef.current.scrollTop = chatWrapperRef.current.scrollHeight
            }
        }
    }

    const userId = Cookies.get('userId')

    const propsDefined = (Token !== undefined || userId !== undefined) &&
        languageTo !== undefined &&
        languageFrom !== undefined &&
        currentTask !== undefined &&
        courseObj !== undefined

    const commonProps = propsDefined ? {
        userId: userId || null,
        Token: Token || null,
        languageTo,
        languageFrom,
        courseId: courseObj._id,
        setCurrentTaskNumber,
        currentTaskNumber,
        currentTask,
        completedTasks,
        mistake: -1,
        setCompletedTasks,
        learnMode: courseObj.learnMode,
        course: courseObj
    } : null;


    return (
        <div>
            <PageHead
                title={'META_TAG_ABOUTCOURSE_TITLE_' + (languageTo || 'geo')}
                description={
                    'META_TAG_ABOUTCOURSE_DESCRIPTION_' + (languageTo || 'geo')
                }
                keywords={'META_TAG_ABOUTCOURSE_KEYWORDS_' + (languageTo || 'geo')}
            />


            {courseObj && showFeedBack && (
                <Feedback
                    setOpenFeedback={() => setShowFeedBack(false)}
                    currentCourseObject={courseObj}
                    currentTaskData={currentTask}
                    screenshotRef={screenshotRef}
                    token={Token || null}
                    UserEmail={session?.user.email}
                    locale={locale}
                />
            )}

            <div className={style.container} ref={screenshotRef}>
                {
                    courseObj && <>
                        <Header
                            size="s"
                            currentCourseObject={courseObj || undefined}
                            token={Token}
                            setShowTopScores={setShowTopScores}
                            showTopScores={showTopScores}
                        />

                        <CombinedModalComponent
                            token={Token || null}
                            courseName={courseName}
                            courseId={courseObj?._id || ' '}
                            isUserLoggedIn={user ? true : false}
                            completedTasks={completedTasks}
                            unAuthuserDailyLimit={courseObj?.course?.configuration?.unAuthUserDailyLimit as number}
                            languageTo={languageTo}
                            languageFrom={languageFrom}
                            dailyTaskLeft={courseObj?.info.dailyTaskLeft as number}
                            currentCourseObject={courseObj}
                            dailyReachedLimitDate={courseObj?.dailyReachedLimitDate ? new Date(courseObj.dailyReachedLimitDate) : ''}
                        /></>
                }

                {slug !== 'soundcheck' && courseObj && Token && (
                    <Ratings
                        userCourseId={courseObj._id}
                        courseId={courseObj.course._id}
                        userScore={courseObj.score || 0}
                        token={Token}
                        showTopScores={showTopScores}
                    />
                )}
                {slug !== 'soundcheck' && <BackgroundParrot />}
                <FeedbackButton
                    setOpenFeedback={setShowFeedBack}
                    openFeedback={showFeedBack}
                />

                {slug === 'soundcheck' && <SoundCheck
                    setSoundChecked={() => { router.push('/lessons/course/' + (queryStr ? '?' + queryStr : '')) }}
                    soundChecked={false}
                />}

                {
                    slug !== '' && slug !== 'soundcheck' && courseObj && <LearnMenu
                        languageTo={languageTo as string}
                        languageFrom={languageFrom as string}
                        setTab={(tab) => router.push('/lessons/' + tab + '/' + (queryStr ? '?' + queryStr : ''))}
                        tab={slug as string}
                        token={Token as string}
                        languageCourseId={courseObj?.course._id || ''}
                        languageId={courseObj?.course.iLearn._id || ''}
                    />
                }

                {
                    slug === 'course' && <div className={style.content}>
                        {courseObj && (
                            <ProgressBar
                                currentCourseObject={courseObj}
                                userScore={courseObj.score}
                            />
                        )}
                        {slug !== 'course' && courseObj && (
                            <Wrapper
                                token={Token ?? ''}
                                currentCourseObject={courseObj}
                                languageFrom={languageFrom}
                                tab={slug}
                                setTab={(tab) => router.push('/lessons/' + tab + '/' + (queryStr ? '?' + queryStr : ''))}
                            />
                        )}

                        <div className={style.chatContainer}>
                            <div className={style.chat} ref={chatRef}>
                                <div ref={chatWrapperRef} className={style.chatWrapper}>

                                    {
                                        currentTask && courseObj && <TaskWrapper
                                            commonProps={commonProps}
                                            setCurrentTaskNumber={setCurrentTaskNumber}
                                            data={tasksData[currentTaskNumber]}
                                            getTasksHandler={() => getTasksList(Cookies.get('userId') as string, courseObj)}
                                            setCompletedTasks={setCompletedTasks}
                                            completedTasks={completedTasks}

                                            onDivHeight={handleGrammarHeight}
                                            mistakesByLevel={getLevelColors({
                                                currentTask: currentTask,
                                                currentCourseObject: courseObj,
                                            })}
                                            taskCount = { tasksData.length }
                                            currentTaskNumber = {currentTaskNumber}
                                        />
                                    }

                                    {!currentTask && <div className={style.blankBubble} />}
                                </div>
                            </div>
                            {/* {commonProps && (
                                <CurrentTaskInput
                                    commonProps={commonProps}
                                    currentMessageIndex={currentMessageIndex}
                                    setCurrentMessageIndex={setCurrentMessageIndex}
                                />
                            )} */}
                        </div>

                    </div>
                }


            </div>
        </div>
    )
}




export default Lessons
