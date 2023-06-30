const getStyles = () => ({
    title: {
        fontSize: 18,
        padding: '15px',
        marginBottom: '30px',
        textAlign: 'center'
    }
})

const AddCarSecTitle = () => {
    const styles = getStyles()
    return <h2 style={styles.title}>Add Car</h2>
}

export default AddCarSecTitle