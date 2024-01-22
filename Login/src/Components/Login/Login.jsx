import formStyle from './login.module.scss'
export function LoginForm({submitAction, children}) {

  // Koden er deconstructed
  return (
      

    <form className={formStyle.form} onSubmit={(e) => submitAction(e)}>{children}</form>

  )
}
