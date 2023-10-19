// import React, { useState } from 'react'
// import style from './mailForm.module.scss'
// import { useTranslation } from '@utils/useTranslation'
// import { putQuestion } from '@utils/getFAQ'
// import Swal from 'sweetalert2'

// const MailForm: React.FC = () => {
//   const { t } = useTranslation()
//   const [feedback, setFeedback] = useState('')
//   const [email, setEmail] = useState('')

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault()

//     const questionData = {
//         feedback,
//         email
//       };

//     try{
//         await putQuestion( questionData)
//         Swal.fire({
//             title: 'Sent',
//             text: 'Successfully uploaded your profile!',
//             icon: 'success',
//             showConfirmButton: true,
//             confirmButtonColor: 'rgb(105 46 150)', 
//             confirmButtonText: 'OK',
//           })
//     } catch (error) {
//       }
      
//     console.log('Feedback:', feedback)
//     console.log('Email:', email)
//   }

//   return (
//     <div className={style.wrapper}>
//       <p className={style.title}>{t('FAQ_NO_ANSWER_FOUND')}</p>
//       <p className={style.paragraph}>{t('FAQ_SOLUTION')}</p>

//       <form onSubmit={handleSubmit}>
//         <div className={style.form}>
//           <p className={style.paragraph}>{feedback.length} / 725</p>
//           <textarea
//             value={feedback}
//             onChange={e => setFeedback(e.target.value)}
//             placeholder="Your feedback here..."
//             maxLength={725}
//             className={style.textArea}
//             required
//           />

//           <div className={style.mailButton}>
//             <input
//               type="email"
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               placeholder={t('FAQ_FORM_EMAIL')}
//               className={style.mail}
//               required
//             />
//             <button
//               type="submit"
//               className={!feedback || !email.includes('@') ? style.buttonDisabled : ''}
//             >
//               {t('FAQ_FORM_SUBMIT')}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default MailForm
