import React from 'react';
import './estilos.css';

// classe
export default class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            cadastro:true,
            codigo:'',
            despesa:'',
            valor:'',
            vencimento:'',
            situacao:'',
            vetor:[]

        }
    }
    
    // montar as propriedades antes do render
    componentDidMount(){
       // this.listar();
    }

    // funcao cadastrar
    // cadastrar = () => {
    //     var obj = {
    //         "despesa":this.state.despesa,
    //         "valor":this.state.valor,
    //         "vencimento":this.state.vencimento
    //     }
    // }

    // // comunicação com a API do banco de dados
    // fetch('http://localhost:8080/api', {
    //     method:'POST',
    //     headers:{
    //         'Accept':'application/json',
    //         'Content-Type':'application/json'
    //     },
    //     body: JSON.stringify(obj)
    // })
    // .then(retorno => retorno.json())
    // .then(retorno => 
    //     )

    
    
    
    
    // listar os produtos na tabela
    listar = () => {
        fetch('http://localhost:8080/api')
        .then(retorno => retorno.json())
        .then(retorno => {
            this.setState({vetor : retorno})
        })
    }
    
    
    
    
    
    // Render
    render(){
        return(
            <div>
                {/* FORMULARIO */}
                <form>
                    <div>
    
                    </div>

                    <input type='text' value={this.state.despesa} placeholder='Descrição da despesa' name='descricao' className='form-control' />
                    <input type='text' value={this.state.valor} placeholder='Valor' name='valor' className='form-control' />
                    <input type='text' value={this.state.vencimento} placeholder='Data de vencimento' name='vencimento' className='form-control' />

                    {this.state.cadastro === true ?
                    <input type='button' value='Cadastrar' className='btn btn-primary' />
                    :

                    <div>
                        <input type='button' value='Editar' className='btn btn-warning' />
                        <input type='button' value='Remover' className='btn btn-danger' />
                        <input type='button' value='Cancelar' className='btn btn-secondary' />
                    </div>
                    }
                    
                </form>
    
                {/* TABELA */}
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Despesa</th>
                            <th>Valor</th>
                            <th>Vencimento</th>
                            <th>Situação</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.vetor.map((despesa, indice) => {                      
                            return(
                            <tr>
                                <td>{despesa.codigo}</td>
                                <td>{despesa.despesa}</td>
                                <td>{despesa.valor}</td>
                                <td>{despesa.vencimento}</td>
                                <td>{despesa.situacao}</td>
                                <td><button className='btn btn-sucess' value={indice}>Selecionar</button></td>
                            </tr>
                        )}
                    )}
                    </tbody>
                </table>
            </div>
    
        );
    }
}


