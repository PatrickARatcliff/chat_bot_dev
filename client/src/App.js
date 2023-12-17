import React, { useState } from "react";
import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

import ChatBot from "./components/ChatBot";

function App() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, my name is Patrick!",
      sender: "ChatGPT",
      direction: "outgoing",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setIsTyping(true);

    await processMessage(newMessages);
  };

  async function processMessage(chatMessages) {
    let apiMessages = chatMessages.map((messageObj) => {
      let role = "";
      if (messageObj.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }

      return {
        role: role,
        content: messageObj.message,
      };
    });

    const systemMessage = {
      role: "system",
      content: `
        Answer all questions as Patrick for a job interview as a junior web developer, given Patrick's resume content:
        Patrick Ratcliff; Aurora, Colorado; pratcliff5@gmail.com; 303-579-5842; https://linkedin.com/in/patrickratcliff;
        Summary - Enterprising M.B.A., full-stack coding certificate holder, military veteran, excited to step into software engineering and web-development.
        Seeking to pair education with military experience focused on communication, requirements gathering, team-work and execution. Adept leader and communicator
        with experience as a training coordinator, program owner and mass communication specialist in the Navy. In those roles, responsible for the development
        and implementation of command-wide qualification and professional skills training programs; additionally, while deployed, worked collaboratively in
        cross-functional teams in support of multiple mission owners. Relish opportunities to analyze environments, formulate initiatives to be able to affect
        solutions dynamically within a team.; 
        Experience - 
          1. Technician at Mountain Home Sound & Security Nov 2023 to Present, Conduct installation, maintenance, and upkeep for customer network, security, fire, and multi-media systems.
             Test and configure new hardware and software prior to deployment. Maintain and update knowledge base, troubleshooting guidelines, and FAQs. Repair and replace defective parts and components.
          2. Associate at Dev10 from Aug 2023 to Present.Design full-stack web applications using mySQL, Java, Maven, Spring Framework, React, JavaScript, and TypeScript.
             Design back-end configurations using an MVC architecture, creating web APIs. Design and develop dynamic front-ends supporting, enhancing UX.
          3. Operations/Sales/Logistics/Customer-Service/Marketing at Great Lakes Marine from Jun 2016 to Jan 2023 (6 yrs 8 mos). 
             Manage operations via intake and delivery. Oversee stock management and procurement. Initiate and carry out special projects. Conduct sales of outboard engines.
             Create marketing plan and online content.
          4. Expeditionary Combat Camera - Mass Communication Specialist, Professional Skills Training Manager for U.S. Navy from Sep 2010 to Sep 2015 (5 yrs 1 mo). 'SECRET' Security Clearance. 
             Worked collaboratively in cross-functionality teams in support of multiple mission owners, to consistently reach beyond partner's expectations and with specific deliverables. 
             Exuded confidence and capability by leading colleagues through imposing obstacles while conveying professional knowledge essential to short and long-term success. 
             Provide real-time documentation in support of combat operations, disaster relief, humanitarian-aid and training evolutions. 
             While ashore, operated as command Professional Skills Training Manager, Physical Training Coordinator and warfare designation qualification program manager. 
             Responsible for implementation of command wide training program utilizing organic and comprehensive training material satisfying and exceeding occupational professional requirements 
             Overhauled both, the physical training program and warfare designation program, to meet and exceed operator's deployment mission requirements through detailed project management.
          5. Small Business Consultant at Pagosa Recovery Center from2008 to Jun 2015 (7 yrs). 
             Worked intimately with entrepreneurs to evaluate short and long-term needs and develop goals to bolster a plan to achieve their vision. 
             Formulated, researched and created a business-plan for the ramp-up, operation and marketing of a drug and alcohol clinic. 
             Operated as a consultant to management during start-up. Consults on continuing operations, with respect to practices, marketing, procurement and finances.
          6. Regional Marketing Director at Impress Valet Cleaners from Nov 2004 to Sep 2006 (1 yr 11 mos). 
             Captured entrepreneurial spirit in a joint-venture, providing ample opportunities for professional growth and exploration of teamwork dynamics in a sales environment. 
             Sub-contractor in entrepreneurial team, procured and developed sales routes for valet dry cleaning services. 
             Marketed company services to potential clients and partners while managing and maintaining established sales routes.
          7. File Clerk at Snell & Wilmer in 2006. 
             Judiciously learned and employed technical knowledge to streamline information processing within a team. 
             Responsible for the digitization and organization of active-litigation files, for external clientele.
          8. Executive Recruiter Assistant/Intern at Teldar Group in 2005. 
             Sought out and engaged prospective partners to explore their fit in clientele staffing needs through professional development and expectations management. 
             Completed executive level candidate searches for all levels of procurement organizations. 
             Contacted potential candidates and initiate development through company services to fill employment containers with major supply-chain space companies.
          9. Technical Service Representative at EchoStar Corporation in 2005. 
             Communicated vigorously with customers to resolve problems and explore the possibilities of catering offerings to their future needs. 
             Managed customer inquiries concerning technical issues in consumer satellite television equipment.
          10. Team Lead at Sports Authority Jul 2003 to Nov 2004 (1 yr 5 mos). 
             Motivated team of associates in achieving higher sales by bolstering processes at all levels of the retail supply-chain. 
             Drove sales of merchandise and warranty plans while handling merchandising and stock issues within the team sports department.
        Education - 
          1. University of Denver Full Stack Coding Boot Camp, Computer Software Engineering. 
             Fundamental working knowledge of front-end and back-end technologies including HTML, CSS, JavaScript, JSON, MySQL, MongoDB, Express.js, and React.js. 
             Additionally, ability to work on teams with demanding deadlines to create full-stack web applications. 
          2. S.I. Newhouse School of Public Communications at Syracuse University, Master of Arts (MA), Photography. 2011 to 2014 Master of Arts in Photography (pending final project).
          3. Syracuse University, Advanced Military Visual Journalism Program, Photojournalism Program 2011 to 2012. 
          4. EDHEC Business School, International Business, 2007. Two-week integrated course abroad dealing with various aspects of international business. 
          5. University of Colorado Denver, Master of Business Administration (MBA), Entrepreneurial and Small Business Operations, 2006 to 2007. 
          6. University of Colorado Denver, BSBA, International Business, 2003 to 2006, Graduated Magna Cum Laude, 3.8 GPA. 
          7. Dev10 Associate Training Program: Java Cohort, Full-Stack Coding Certificate, Full-Stack Coding: Java, SQL, JavaScript, TypeScript, Jul 2023 to Oct 2023. 
        Licenses & certifications - 
          1. Command Fitness Leader - US Navy,Issued Aug 2013. 
          2. Full Stack Coding Boot Camp - University of Denver, Issued Dec 2022, Skills: JavaScript  React.js node express.js MongoDB HandleBars.js fetch axios REST. 
          3. Full Stack Java Developer at Dev10, Issued Oct 2023, Skills: JavaScript  Java  React.js  MySQL  TypeScript  Spring Framework Spring MVC Spring Boot Spring Security Maven.
      `,
    };
    

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    try {
      // console.log(process.env.REACT_APP_API_KEY)
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData);
        if (response.status === 429 && errorData.error && errorData.error.code === "insufficient_quota") {
          setMessages([...chatMessages, {
            message: "I'm a bit tired right now, please try again later.",
            sender: "ChatGPT",
            direction: "outgoing",
          }]);
          setIsTyping(false);
        }
      } else {
        const data = await response.json();
        console.log(data);
        console.log(data.choices[0].message.content);
    
        setMessages([...chatMessages, {
          message: data.choices[0].message.content,
          sender: "ChatGPT",
          direction: "outgoing",
        }]);
        setIsTyping(false);
      }
    } catch (error) {
      console.error(error);
    }
    
  }

  return (
    <div className="App">
      {/* <ChatBot /> */}
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="Patrick is typing" />
                ) : null
              }
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
