const getStyles = () => ({
    title: {
        fontSize: 18,
        padding: '15px',
        marginBottom: '30px',
        textAlign: 'center'
    }
})

const AddPersonSecTitle = () => {
    const styles = getStyles()
    return <h2 style={styles.title}>Add Person</h2>
}

export default AddPersonSecTitle