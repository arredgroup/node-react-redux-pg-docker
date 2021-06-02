import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { insertPost, deletePost, retrievePosts, filterPost } from "../../actions/posts";

class Cards extends Component {

    constructor(props){
        super(props);
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.insertPost = this.insertPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.applyFilterPost = this.applyFilterPost.bind(this);
        this.retrievePosts = this.retrievePosts.bind(this);

        this.state = {
            name: "",
            description: "",
            filter: ""
        };

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
        this.props.insertPost(name, description);
    }

    deletePost(post){
        this.props.deletePost(post);
    }

    retrievePosts(){
        this.props.retrievePosts();
    }

    applyFilterPost(){
        this.props.filterPost(this.state.filter)
    }

    listPosts(){
        return (this.state.posts!==null)? this.state.posts.map((post, i)=>{
            return (<tr key={i}>
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
                        <button type="button" className="btn" onClick={this.applyFilterPost} >Buscar</button>
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
                    {this.props.posts && this.props.posts.map((post, i) =>
                        <tr key={i}>
                            <td>{post.nombre}</td>
                            <td>{post.detalle}</td>
                            <td>
                                <button className="btn btn-link" onClick={() => this.deletePost(post)}>eliminar
                                </button>
                            </td>
                        </tr>
                    )
                    }
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

function mapState(state){
    console.log(state.posts)
    return {
        posts: state.posts.data
    }
}


export default connect(mapState, { insertPost, deletePost, retrievePosts, filterPost })(Cards);