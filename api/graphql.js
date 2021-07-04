import { graphqlHTTP } from 'express-graphql'
import { 
  GraphQLBoolean, 
  GraphQLInt, 
  GraphQLList, 
  GraphQLObjectType, 
  GraphQLSchema, 
  GraphQLString 
} from 'graphql';
import { addPassword, editPassword, listPasswords } from './controllers/passwords.js';
import { newSession, authorizeSession } from './controllers/sessions.js';
import { createUser } from './controllers/users.js';

const PasswordType = new GraphQLObjectType({
  name: "Password",
  fields: ()=>({
    id: {type: GraphQLInt},
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

const PasswordListType = new GraphQLObjectType({
  name: "PasswordList",
  fields: ()=>({
    success: {type: GraphQLBoolean},
    passwords: {type: new GraphQLList(PasswordType)}
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
      type: PasswordListType,
      args: {session: {type: GraphQLString}},
      async resolve(parent,args){
        let session = await authorizeSession(args.session);
        if(session.success){
          let { user_id } = session;
          let passwords = await listPasswords(user_id)
          return {success: true, passwords}

        }else{
          return {success: false, passwords: []}
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
    addPassword: {
      type: SuccessType,
      args: {
        session: {type: GraphQLString},
        label: {type: GraphQLString},
        password: {type: GraphQLString}
      },
      async resolve(parent,args){
        let session = await authorizeSession(args.session);
        if(session.success){
          await addPassword(session.user_id,args.password, args.label);
          return {success: true, message: "Password successfully added."}
        }
        return {success: false, message: "Please Log in"};
        
      }
    },
    editPassword: {
      type: SuccessType,
      args: {
        session: {type: GraphQLString},
        id: {type: GraphQLInt},
        label: {type: GraphQLString},
        password: {type: GraphQLString}
      },
      async resolve(parent,args){
        let session = await authorizeSession(args.session);
        if(session.success){
          await editPassword(session.user_id,args.id,args.password,args.label);
          return {success: true, message: "Password successfully edited."}
        }
        return {success: false, message: "Please Log in"};
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
    },
    userLogout: {
      type: SuccessType,
      args: {
        session: {type: GraphQLString}
      },
      async resolve(parent,args){
        
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