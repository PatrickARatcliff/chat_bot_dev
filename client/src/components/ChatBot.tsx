import React, { useEffect, useState } from 'react';

import '../styles/ChatBot.css';

declare global {
    interface Window {
        ao_widget_api: any;
        webchatConfig: any;
    }
}

const ChatBot: React.FC = () => {
    const [chatStarted, setChatStarted] = useState(false);

    const sendMessage = () => {
        if (!chatStarted) skip();
        const input = document.getElementById('messageinput') as HTMLInputElement;
        if (input && window.ao_widget_api?.sendMessage) {
            input.setAttribute('disabled', 'disabled');
            window.ao_widget_api.sendMessage(
                input.value,
                () => {
                    console.log('success');
                    input.value = '';
                    input.removeAttribute('disabled');
                },
                () => {
                    console.log('fail');
                    input.removeAttribute('disabled');
                },
                true
            );
        }
    };

    const startChat = () => {
        const username = document.getElementById('username') as HTMLInputElement;
        const email = document.getElementById('email') as HTMLInputElement;
        window.ao_widget_api.setUsername(username.value);
        window.ao_widget_api.setEmail(email.value);
        skip();
    };

    const skip = () => {
        const userdataform = document.getElementById('userdataform');
        if (userdataform) {
            userdataform.style.display = 'none';
            setChatStarted(true);
        }
    };

    useEffect(() => {
        window.webchatConfig = {
            widgetType: 'chat',
            token: 'S0985836-775-795-5732786H',
            rootElement: document.getElementById('container'),
            actions: {
                init: (obj: any) => {
                    window.ao_widget_api = obj;
                },
            },
        };
    }, []);

    return (
        <>
            <span className="title">
                You can send a new message using the form under the widget
            </span>
            <div id="container" className="container"></div>
            <div id="userdataform" className="form">
                <input id="username" placeholder="Your Name" />
                <input id="email" placeholder="Your Email" />
                <button onClick={startChat}>Start Chat</button>
                <button onClick={skip}>Skip</button>
            </div>
            <div id="sendform" className="form">
                <input id="messageinput" type="text" placeholder="Type your message..." />
                <button onClick={sendMessage}>Send</button>
            </div>
            <script>
                {`window.webchatConfig = {
          widgetType: "chat",
          token: "S0985836-775-795-5732786H",
          rootElement: document.getElementById('container'),
          actions: {
            init: function(obj) {window.ao_widget_api = obj; }
          }
        };`}
            </script>
            <script type="text/javascript" src="https://clikhome-chatbot-widget.s3.amazonaws.com/assets/js/webchat-widget.min.js"></script>
        </>
    );
};

export default ChatBot;
