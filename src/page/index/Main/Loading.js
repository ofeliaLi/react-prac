function Loading(props) {
    if (props.error) {
        return <div>Oops! Something went wrong.</div>;
    } else if (props.pastDelay) {
        return <div>Loading...</div>;
    } else {
        return null;
    }
}

export default Loading;