class RuleBot {
    constructor() {
        this.negative_responses = ["no", "nope", "nah"];
        this.exit_commands = ["quit", "bye", "exit", "later"];
        this.random_questions = [
            "How may I help you?",
            "What can I do for you today?",
            "Is there something you need assistance with?",
        ];
        this.alienbabble = {
            describe_subject_intent: /your subject/i,
            answer_why_intent: /why are/i,
            about_eduailab: /eduailab/i,
            about_sessions: /sessions/i,
            about_assignment: /assignment/i,
            about_courses: /courses/i,
            about_virtual_labs: /virtual\s?labs?/i,
            about_tutorials: /tutorials?/i,
            about_live_classes: /live\s?classes?/i,
            about_contact: /contact/i,
            general_greeting: /hello|hi|hey/i,
            about_payment: /payment/i,
        };
    }

    greet() {
        this.name = "User"; // Hardcoding for simplicity
        return {
            message: `Hi ${this.name}, I am an EduAIlab chatbot. How can I assist you today?`,
            askQuestion: this.getRandomQuestion(),
        };
    }

    make_exit(reply) {
        return this.exit_commands.includes(reply.toLowerCase());
    }

    chat() {
        let reply = this.getRandomQuestion();
        while (!this.make_exit(reply)) {
            reply = this.respondTo(reply).message;
        }
        return "Have a wonderful day!";
    }

    respondTo(message) {
        console.log("User message:", message); // Debugging statement

        for (const [intent, regexPattern] of Object.entries(this.alienbabble)) {
            const foundMatch = regexPattern.test(message);
            console.log(`Checking intent ${intent}: ${foundMatch}`); // Debugging statement

            if (foundMatch) {
                return {
                    message: this[intent](),
                    askQuestion: this.getRandomQuestion(),
                };
            }
        }

        // Handle yes/no responses
        if (this.isYesResponse(message)) {
            return {
                message: "Great to hear that! How else can I assist you?",
                askQuestion: this.getRandomQuestion(),
            };
        } else if (this.isNoResponse(message)) {
            return {
                message: "I'm sorry to hear that. Can I help you with something else?",
                askQuestion: this.getRandomQuestion(),
            };
        }

        return {
            message: this.no_match_intent(),
            askQuestion: null,
        };
    }

    isYesResponse(message) {
        const affirmativeResponses = ["yes", "yeah", "yep", "sure"];
        return affirmativeResponses.includes(message.trim().toLowerCase());
    }

    isNoResponse(message) {
        return this.negative_responses.includes(message.trim().toLowerCase());
    }

    describe_subject_intent() {
        const responses = [
            "My subject is SCIENCE.",
            "My subject is ENGLISH.",
            "My subject is MATHS.",
            "My subject is PHYSICS.",
            "My subject is CHEMISTRY.",
            "My subject is COMMERCE.",
            "My subject is ARTS.",
            "My subject is HINDI.",
        ];
        return this.getRandomResponse(responses);
    }

    answer_why_intent() {
        const responses = ["Regarding classes.", "Regarding subjects.", "Regarding doubts."];
        return this.getRandomResponse(responses);
    }

    about_eduailab() {
        const responses = [
            "EduAIlab is an educational website.",
            "EduAIlab has AI chatbots, virtual labs, and live classes.",
            "EduAIlab helps students learn in a better way.",
        ];
        return this.getRandomResponse(responses);
    }

    about_sessions() {
        const responses = ["Sessions will start from 10th July."];
        return this.getRandomResponse(responses);
    }

    about_assignment() {
        const responses = ["Click on the assignment bar, then click on 'submit assignment'."];
        return this.getRandomResponse(responses);
    }

    about_courses() {
        const responses = [
            "We offer a variety of courses in science, mathematics, and the humanities.",
            "Our courses are designed to be engaging and informative.",
            "You can view all available courses on our 'Courses' page.",
        ];
        return this.getRandomResponse(responses);
    }

    about_virtual_labs() {
        const responses = [
            "Our virtual labs provide hands-on learning experiences.",
            "You can perform experiments in a simulated environment.",
            "Visit the 'Virtual Labs' page to explore our lab offerings.",
        ];
        return this.getRandomResponse(responses);
    }

    about_tutorials() {
        const responses = [
            "Our tutorials cover a wide range of topics.",
            "You can access video tutorials on our 'Tutorial' page.",
            "Our tutorials are designed to help you understand complex concepts easily.",
        ];
        return this.getRandomResponse(responses);
    }

    about_live_classes() {
        const responses = [
            "Our live classes are conducted by expert instructors.",
            "You can join live classes to interact with instructors in real-time.",
            "Check the 'Live Class' page for the schedule and to join a class.",
        ];
        return this.getRandomResponse(responses);
    }

    about_contact() {
        const responses = [
            "You can contact us through the 'Contact Us' page.",
            "Feel free to reach out via email or phone.",
            "Our support team is available to assist you with any queries.",
        ];
        return this.getRandomResponse(responses);
    }

    general_greeting() {
        const responses = [
            "Hello! How can I assist you today?",
            "Hi there! What can I help you with?",
            "Hey! How may I be of service?",
        ];
        return this.getRandomResponse(responses);
    }

    about_payment() {
        const responses = [
            "You can make payments through our secure online portal.",
            "Visit the 'Payment' page for information on payment methods.",
            "For any payment-related issues, please contact our support team.",
        ];
        return this.getRandomResponse(responses);
    }

    no_match_intent() {
        const responses = [
            "I'm not sure how to respond to that. Can you ask something else?",
            "I don't have the information you're looking for. Please contact our support team.",
            "Please contact our helpline number.",
        ];
        return this.getRandomResponse(responses);
    }

    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getRandomQuestion() {
        return this.random_questions[Math.floor(Math.random() * this.random_questions.length)];
    }
}

// Export RuleBot class for use in other scripts
export default RuleBot;