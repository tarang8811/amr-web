import Images from 'Themes/Images'

const styles = {
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: `url(${Images.login})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: '96px 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: '20px',
    width: '160px'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '8px'
  },
  submit: {
    margin: '24px 0px 16px'
  }
}

export default styles
