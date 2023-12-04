import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import dotenv from "dotenv";
dotenv.config();
// Instantiate a new Pinecone client, which will automatically read the
// env vars: PINECONE_API_KEY and PINECONE_ENVIRONMENT which come from
// the Pinecone dashboard at https://app.pinecone.io

//CREATE THE PINECONE CONNECTION
const pinecone = new Pinecone({      
	environment: process.env.PINECONE_ENVIRONMENT,  
	apiKey: process.env.PINECONE_API_KEY,      
});
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);


async function embedDocuments(docs){
    await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings({openAIApiKey: process.env.CHATGPT_API_KEY}), {
        pineconeIndex,
        maxConcurrency: 5, // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
      });
    console.log("Documents Imbeded and Stored")    
}

class PineVector{
  constructor(pineconeIndex){
    this.vectorStore = null;
    this.pineconeIndex = pineconeIndex;
  }

  init = async ()=>{
    this.vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({openAIApiKey: process.env.CHATGPT_API_KEY}),
      { pineconeIndex: this.pineconeIndex }
    );
    console.log("done")
  }

  query = async (query,num=1)=>{
    const results = await this.vectorStore.similaritySearch(query,num);
    console.log(results)
  }
}

const pine = new PineVector(pineconeIndex)
await pine.init()
await pine.query("acorn")


// EXAMPLE DOCUMENT FOR THE DATABASE
// const docs = [
//   new Document({
//     metadata: { foo: "bar" },
//     pageContent: "pinecone is a vector db",
//   }),
//   new Document({
//     metadata: { foo: "bar" },
//     pageContent: "the quick brown fox jumped over the lazy dog",
//   }),
//   new Document({
//     metadata: { baz: "qux" },
//     pageContent: "lorem ipsum dolor sit amet",
//   }),
//   new Document({
//     metadata: { baz: "qux" },
//     pageContent: "pinecones are the woody fruiting body and of a pine tree",
//   }),
// ];
