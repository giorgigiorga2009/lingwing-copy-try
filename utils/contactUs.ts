import axios from 'axios'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import '../pages/contact-us.module.scss'

interface FormValues {
  fullname: string
  subject: string
  message: string
  email: string
}

const PostData = async (
  values: FormValues,
  { resetForm }: { resetForm: () => void },
) => {
  try {
    await axios.post(`${process.env.defaultURL}/public/contact`, values, {
      headers: {
        'x-access-token': Cookies.get('authToken')!,
      },
    })
    Swal.fire({
      title: 'Successfully sent a message!',
      confirmButtonColor: '#8647b7',
      icon: 'success',
      confirmButtonText: 'Okey',
    })
    resetForm()
  } catch (error) {
    console.error('Error sending message:', error)
    Swal.fire({
      title: 'Message didnt sended try again!',
      confirmButtonColor: '#8647b7',
      icon: 'error',
      confirmButtonText: 'Close',
    })
  }
}

export default PostData
