const { render } = require("@testing-library/react");

export default function Alert({alertText, renderAlert}){
    if (renderAlert) {
        return (
        <div className="alert alert-danger" role="alert">
            {alertText}
        </div>
        )
    } else {
        return null;
    }
}