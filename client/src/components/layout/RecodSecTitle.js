const getStyles = () => ({
    title: {
        fontSize: 18,
        padding: '15px',
        marginBottom: '30px',
        textAlign: 'center',
        fontWeight: 'Bold'
    }
})

const AddCarSecTitle = () => {
    const styles = getStyles()
    return <h2 style={styles.title}>Records</h2>
}

export default AddCarSecTitle