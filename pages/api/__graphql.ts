import { ApolloServer } from "apollo-server-micro";
import {schema} from '../../graphql/schema'
import { resolvers } from "../../graphql/resolvers";
import { createContext } from "../../graphql/context";
import Cors from 'micro-cors'
import micro_cors from "micro-cors"
const corss = micro_cors({origin:"https://studio.apollographql.com",allowMethods:["GET","POST"],allowHeaders:["Access-Control-Allow-Credentials","true","Content-Type","Access-Control-Allow-Origin","Access-Control-Allow-Headers"]})


const cors = Cors();

const apollServer = new ApolloServer({schema, resolvers,context: createContext,  introspection: true,
})

const startServer = apollServer.start()

export default corss(async function handler(req, res) {
    if(req.method === "OPTIONS"){
        res.end()
        return false
    }
    await startServer;

    await apollServer.createHandler({
        path: '/api/graphql'
    })(req, res);
});

export const config = {
    api:{
        bodyParser: false,
    }
}

