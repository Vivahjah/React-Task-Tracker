import PropTypes from 'prop-types'


const Buttons = ({ color, text,  onAdd}) => {

    return (
    <button onClick = {onAdd} style={{ backgroundColor : color }} className="btn">
        {text}
    </button>

  )
}

Buttons.defaultProps = {
    color: 'steelblue'
}

Buttons.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    click: PropTypes.func,
}
export default Buttons