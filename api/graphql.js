import { graphqlHTTP } from 'express-graphql'
import { GraphQLBoolean, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

import {newSession, authorizeSession} from './controllers/sessions.js';
import { createUser } from './controllers/users.js';

const PasswordType = new GraphQLObjectType({
  name: "Password",
  fields: ()=>({
    label: {type: GraphQLString},
    password: {type: GraphQLString}
  })
})

const LoginType = new GraphQLObjectType({
  name: "Login",
  fields: ()=>({
    success: {type: GraphQLBoolean},
    message: {type: GraphQLString},
    session: {type: GraphQLString}
  })
})

const SuccessType = new GraphQLObjectType({
  name: "Success",
  fields: ()=>({
    success: {type: GraphQLBoolean},
    message: {type: GraphQLString}
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getPasswords: {
      type: new GraphQLList(PasswordType),
      args: {session: {type: GraphQLString}},
      async resolve(parent,args){
        let session = await authorizeSession(args.session);
        if(session.success){
          let { user_id } = session;
          
        }else{
          return {success: false, message: "Please log in!"}
        }
      }
    },
    userLogin: {
      type: LoginType,
      args: {
        username: {type: GraphQLString},
        password: {type: GraphQLString}
      },
      async resolve(parent,args){
        let result = await newSession(args.username,args.password)
        return result;
      }
    }
  }
})

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    setPassword: {
      type: GraphQLBoolean,
      args: {
        session: {type: GraphQLString},

      },
      resolve(parent,args){

      }
    },
    userRegister: {
      type: SuccessType,
      args: {
        username: {type: GraphQLString},
        password: {type: GraphQLString}
      },
      async resolve(parent,args){
        let result = await createUser(args.username,args.password);
        return result;
      }  
    }
  }
})

const schema = new GraphQLSchema({query: RootQuery, mutation: RootMutation})


const APIRouter = graphqlHTTP({
  schema,
  graphiql: true
})

export default APIRouter;