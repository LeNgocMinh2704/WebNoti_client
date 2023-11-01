import "./App.css";
import Icon from "./assets/logo.png";
import { VAPID_PUBLIC_KEY } from "./utils/contants";
import { urlBase64ToUint8Array } from "./utils/lib";

function App() {
    const handleClickNotify = () => {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                const notification = new Notification("Example noti", {
                    body: "This is message",
                    data: { hello: "world" },
                    icon: Icon,
                });

                console.log(notification);
                const message = new SpeechSynthesisUtterance(notification.body);
                window.speechSynthesis.speak(message);

                notification.addEventListener("error", (e) => {
                    console.log("Log check error: ", e);
                });
            } else {
                // Permission denied.
            }
        });
    };

    const sendNotiwithSerive = async () => {
        const res = await fetch("http://localhost:5001/send-notification", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const resJson = await res.json();

        console.log("Log check res: ", resJson);

        // const message = new SpeechSynthesisUtterance(resJson.body);
        // window.speechSynthesis.speak(message);
    };

    const handleSubscribe = async () => {
        console.log("Log check subscribe");
        const register = await navigator.serviceWorker.register("./worker.js", {
            scope: "/",
        });

        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });

        await fetch("http://localhost:5001/subscribe", {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    return (
        <>
            <div>
                <button onClick={handleClickNotify}>Click send noti</button>

                <button onClick={handleSubscribe}>subscribe</button>
                <button onClick={sendNotiwithSerive}>Click send noti using webhook</button>
            </div>
        </>
    );
}

export default App;
