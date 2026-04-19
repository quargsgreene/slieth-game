export default function Help() {
    return (
        <div className="help-page">
            <h1>Help</h1>
            <p>To start a new Slieth instance, click the "New Slieth Instance" button on the start page.</p>
            <br />
            <p>To resume a previous instance, click the "Resume Instance" button on the start page.</p>
            <br />
            <p>If you have an instance JSON file, you can also upload it to resume the instance.</p>
            <br />
            <p>To delete an instance, click the "Delete Instance" button on the instance page and enter the instance ID.</p>
            <br />
            <p>To report an issue or provide feedback, please open an issue on our GitHub repository.</p>
        </div>
    );
}