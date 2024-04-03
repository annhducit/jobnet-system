# Build Prompt Template
from langchain.prompts import PromptTemplate
# Run one chain
from langchain.chains import LLMChain

from django.conf import settings

# Test
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings


class EmbeddingVector():
    chain = None
    embeddings = GoogleGenerativeAIEmbeddings(google_api_key=settings.GOOGLE_GEMINI_API_KEY, model="models/embedding-001")

    def __init__(self) -> None:
        # GenAI
        llm = ChatGoogleGenerativeAI(google_api_key=settings.GOOGLE_GEMINI_API_KEY, model="gemini-pro")

        prompt_template = PromptTemplate(
            input_variables = ['name', 'position', 'salary'],
            template =
                """ 
                You need to combine these fields "name", "Position", "salary" into one complete job post name that make senses and return only post name to me.
                For example: "name" is "IT", "position" is "Backend", "salary" is "Over 5 million".
                So the complete sentence as result return would be like "IT for backend with salary over 5 million".
                let's do it completely with 3 corresponding values {name}, {position}, {salary}.
                """
        )
        prompt_template.format(name = "Web developer", position = "Frontend", salary = "2000-5000$")
        self.chain = LLMChain(llm = llm, prompt = prompt_template)
        
    def combineAndEmbeding(self, name, salary, position):
        result = self.chain.invoke(input={"name": name, "position": position, "salary": salary})
        vector = self.embeddings.embed_query(result.get("text").strip())

        custom_output = {
            "question": result.get("input", {}),
            "result": {
                "vector": vector,
                "queryCombine": result.get("text").strip()
            }
        }
        return custom_output
    
    def embedQuery(self, query):
        vector = self.embeddings.embed_query(query.strip())
        print(len(vector))
        return vector

    

    
    
