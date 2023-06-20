import { GraphQLObjectType } from "graphql";
import { extendType, intArg, objectType, stringArg } from "nexus";

export const Task = objectType({
    name: 'Task',
    definition(t) {
        t.string('id');
        t.string('title');
        t.string('description');
        t.string('dueDate');
        t.int('tomatoes');
        t.string('userName');
        


    },
})
export const TasksQuery = extendType({
    type:'Query',
    definition(t){
        t.nonNull.list.field('tasks',{
            type:'Task',
            args:{
                userName: stringArg()
            },
            resolve(parent, args, ctx){
                return ctx.prisma.task.findMany({where: {userName: args.userName}});
            }
        })
    }
})

export const addTask = extendType({
    type:'Mutation',
    definition(t) {
        t.field('task',{
            type:'Task',
            args:{
                title: stringArg(),
                description: stringArg(),
                dueDate: stringArg(),
                tomatoes: intArg(),
                userName: stringArg()

            }
        })
    },
})
