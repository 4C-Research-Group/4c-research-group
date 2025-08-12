import streamlit as st
import requests

st.set_page_config(page_title="4C Research Lab Chatbot", page_icon="🤖")

st.title("4C Research Lab Chatbot 🤖")
st.write("Ask me anything about the 4C Research Lab!")

# You can change this to your local FastAPI endpoint or deployed API
API_URL = "http://localhost:8000/chat"

if "messages" not in st.session_state:
    st.session_state["messages"] = []


def get_bot_response(user_message):
    response = requests.post(
        API_URL,
        json={"query": user_message}
    )
    if response.status_code == 200:
        return response.json().get("answer", "Sorry, I couldn't find an answer.")
    else:
        return "Error: Could not reach the backend."


# Chat interface
user_input = st.text_input("You:", key="user_input")
if st.button("Send") or user_input:
    if user_input:
        st.session_state["messages"].append(
            {"role": "user", "content": user_input})
        bot_reply = get_bot_response(user_input)
        st.session_state["messages"].append(
            {"role": "bot", "content": bot_reply})
        st.session_state["user_input"] = ""  # Clear input

# Display chat history
for msg in st.session_state["messages"]:
    if msg["role"] == "user":
        st.markdown(f"**You:** {msg['content']}")
    else:
        st.markdown(f"**Bot:** {msg['content']}")
