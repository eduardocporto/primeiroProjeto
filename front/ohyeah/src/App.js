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
            vetor:[],
            statusAlerta: '',
            textoAlerta: '',
            desabilitarBotao : false

        }
    }

    // jogar dados no vetor
    listar = () => {
        fetch('http://localhost:8080/api')
        .then(retorno => retorno.json())
        .then(retorno => {
            this.setState({vetor : retorno})
        })
    }
    
    // montar as propriedades antes do render
    componentDidMount(){
       this.listar();
    }

    // comando ao digitar
    aoDigitar = (e) => {
        var nomeCampo = e.target.name;
        var valorCampo = e.target.value;

        this.setState({[nomeCampo] : valorCampo});

    }

    limparCampos = () => {
        this.setState({
            codigo:'',
            despesa:'',
            valor:'',
            vencimento:'',
            situacao:''
        })
    }

    // formatar data para o formato Hue Br
    formatarData = () => {
        var formatarData = this.state.vencimento;

        var dia = formatarData.substring(8)
        var mes = formatarData.substring(5, 7)
        var ano = formatarData.substring(0, 4)
        
        var novaData = dia + "/" + mes + "/" + ano;

        return novaData;
    }

    //funcao cadastrar
    cadastrar = () => {

        if(this.state.despesa === ''){
            this.setState({
                statusAlerta:'Falha',
                textoAlerta:'O campo despesa precisa ser preenchido'
            })

        }else if(this.state.valor === ''){
                this.setState({
                    statusAlerta:'Falha',
                    textoAlerta:'O campo valor precisa ser preenchido'
                })
        
        }else if(this.state.vencimento === ''){
            this.setState({
                statusAlerta:'Falha',
                textoAlerta:'O campo vencimento precisa ser preenchido'
            })
        
        }else{
            var obj = {
                "despesa" : this.state.despesa,
                "valor" : this.state.valor,
                "vencimento" : this.formatarData(),
                "situacao":null    
            }
    
            // comunicar com a API
            fetch('http://localhost:8080/api', {
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(obj)
            })
    
            .then(retorno => retorno.json())
            .then(retorno => {

                // copiar vetor
                var copiaVetor = [...this.state.vetor];
    
                // adicionar um novo elemento
                copiaVetor.push(retorno);
    
                // sobrepor o state do vetor
                this.setState({vetor : copiaVetor});

                // limpar os campos
                this.limparCampos();

                // alterar status da mensagem
                this.setState({
                    statusAlerta:'Ok',
                    textoAlerta:'Cadastro realizado com sucesso' 
                })                               
            })
        }
        
    }

        
    mudarSituacao = (e) => {

        this.setState({desabilitarBotao : true})
        setTimeout(() => {

            var indice = e.target.value;
            
            var obj = this.state.vetor[indice];

            obj.situacao = obj.situacao == false ? true : false;

            var copiaVetor = [...this.state.vetor];

            copiaVetor[indice] = obj;

            this.setState({vetor : copiaVetor})


            // comunicação com a API do banco de dados
            fetch('http://localhost:8080/api', {
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(obj)
            })

            
        this.setState({desabilitarBotao : false})
        },3000)
    }
 
    
    
    
    
    // Render
    render(){
        return(
            <div>
                {/* FORMULARIO */}
                <form>
                    <div
                        className={
                            this.state.statusAlerta === 'Falha' ? 'alert alert-danger' :
                            this.state.statusAlerta === 'Ok' ? 'alert alert-success' :
                            ''
                        }>

                    {this.state.textoAlerta}
                    </div>

                    <input type='text' value={this.state.despesa} placeholder='Descrição da despesa' name='despesa' onChange={this.aoDigitar} className='form-control' />
                    <input type='text' value={this.state.valor} placeholder='Valor' name='valor' onChange={this.aoDigitar} className='form-control' />
                    <input type='date' value={this.state.vencimento} placeholder='Data de vencimento' name='vencimento' onChange={this.aoDigitar} className='form-control' />

                    {/* ativar e desativar botões */}
                    {this.state.cadastro === true ?
                    <input type='button' value='Cadastrar' className='btn btn-primary' onClick={this.cadastrar} />
                    :

                    <div>
                        <input type='button' value='Editar' className='btn btn-warning'  />
                        <input type='button' value='Remover' className='btn btn-danger' />
                        <input type='button' value='Cancelar' className='btn btn-secondary' />
                    </div>
                    }
                    
                </form>
    
                {/* TABELA aqui abaixo foi adicionada a "lista" para distinguir o button no CSS*/}                
                <table className='table table-striped lista'>
                    <thead>
                        <tr>
                            <th>#</th>
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
                                <td>{indice + 1}</td>
                                <td>{despesa.despesa}</td>
                                <td>{despesa.valor}</td>
                                <td>{despesa.vencimento}</td>
                                <td>{despesa.situacao === false ? <button className='btn btn-danger' onClick={this.mudarSituacao} value={indice} disabled={this.state.desabilitarBotao}><i className="fas fa-times"></i></button> : <button className='btn btn-success' onClick={this.mudarSituacao} value={indice} disabled={this.state.desabilitarBotao}><i className="fas fa-check"></i></button>}</td>
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


