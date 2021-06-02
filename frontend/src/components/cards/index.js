import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { insertPost, deletePost, retrievePosts } from "../../actions/posts";

class Cards extends Component {

    constructor(props){
        super(props);
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.insertPost = this.insertPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.filterPost = this.filterPost.bind(this);
        this.retrievePosts = this.retrievePosts.bind(this);

        this.state = {
            name: "",
            description: "",
            submitted: false,
            posts: null,
            filter: ""
        };

        if(this.state.posts===null) this.retrievePosts();

    }

    

    onChangeFilter(e){
        this.setState({
          filter: e.target.value,
        });
    }

    onChangeName(e){
        this.setState({
          name: e.target.value,
        });
    }

    onChangeDescription(e){
        this.setState({
          description: e.target.value,
        });
    }

    insertPost(){
        const { name, description } = this.state;
        this.props.insertPost(name, description)
            .then((data) => {
                this.setState({
                    name: data.name,
                    description: data.description,
                    submitted: true,
                });
                console.log(data);
                this.retrievePosts();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    deletePost(id){
        this.props.deletePost(id)
            .then((data) => {
                this.setState({
                    name: "",
                    description: "",
                    submitted: false,
                });
                console.log(data);
                this.retrievePosts();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    retrievePosts(){
        this.props.retrievePosts()
            .then((data) => {
                console.log(data)
                this.setState({
                    posts: data
                })
            })
            .catch((e) => {
                console.log(e);
            });
    }

    filterPost(){
        this.setState({
            posts: this.state.posts.filter((post)=> post.nombre.contains(this.state.filter))
        })
    }

    listPosts(){
        return (this.state.posts!==null)? this.state.posts.map((post, i)=>{
            return (<tr>
                <td>{ post.nombre }</td>
                <td>{ post.detalle }</td>
                <td><button className="btn btn-link" onClick={()=>this.deletePost(post.id)}>eliminar</button></td>
            </tr>)
        }): <tr><td>Cargando...</td></tr>;
    }


    render(){
        return (
            <div className="container">
                <h1>Posts</h1>  
                <div className="row">
                    <div className="col s6">
                        <input type="text" placeholder="Filtro de nombre" value={this.state.filter} onChange={this.onChangeFilter}/>
                    </div>
                    <div className="col s6">
                        <button type="button" className="btn" onClick={this.filterPost} >Buscar</button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.listPosts }
                    </tbody>
                </table>
                <br/>
                <br/>
                <div className="row">
                    <div className="col s4">
                        <input type="text" placeholder="Nombre" value={this.state.name} onChange={this.onChangeName}/>
                    </div>
                    <div className="col s4">
                        <input type="text" placeholder="Descripción" value={this.state.description} onChange={this.onChangeDescription}/>
                    </div>
                    <div className="col s4">
                        <button type="button" onClick={this.insertPost} className="btn">Crear</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(null, { insertPost, deletePost, retrievePosts })(Cards);