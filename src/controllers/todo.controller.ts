import { Request, Response } from "express";
import { Todo } from '../models/Todo'

export const all = async (req: Request, res: Response) => {
    let list = await Todo.findAll();
    res.json({ list })    
}

export const add = async (req: Request, res: Response) => {
    if(req.body.title){
        let newTodo = await Todo.create({
            title:req.body.title,
            done: req.body.done ? true :  false
        })
        res.json({item: newTodo})
    } else {
        res.json({error: 'Title couldnt be null'})
    }
}

export const update = async (req: Request, res: Response) => {
    let { id } = req.params
    let { title, done} = req.body

    let todo = await Todo.findByPk(id)
    if(todo) {
        await todo.update({
            title,
            done
        })
        res.json({todos: todo})
    } else {
        res.json(console.log('Ocorreu um erro'))
    }
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params
    await Todo.destroy({
        where: { id }
    })
    res.json(console.log('Usuário deletado com sucesso'))
}