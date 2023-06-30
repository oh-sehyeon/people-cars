const getStyles = () => ({
  title: {
    fontSize: 20,
    fontWeight: 'Bold',
    padding: '15px',
    paddingBottom: '45px',
    marginBottom: '30px',
    textTransform: 'Uppercase',
    borderBottom: '3px solid grey',
    width: '100%',
    textAlign: 'center'
  }
})

const Title = () => {
  const styles = getStyles()

  return <h1 style={styles.title}>People and Their Cars</h1>
}

export default Title
