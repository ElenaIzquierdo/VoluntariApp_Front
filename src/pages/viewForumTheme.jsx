import React from "react";
import Base from "../components/base";
import connect from "react-redux/es/connect/connect";
import {fetchForumTopic, fetchForumTopicComments, changeNewComment, 
        publishNewComment, closeForumTopic, deleteComment} from "../actions/viewforumthemeActions";
import {Row, Button, Form, FormGroup, Input} from "reactstrap";
import Comment from "../components/Comment";
import '../css/viewforumStyle.css';
import Moment from 'react-moment';
import { Spinner } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import {Link} from "react-router-dom";

class viewForumTheme extends React.Component{
    componentWillMount(){
        this.props.fetchForumTopic(this.props.match.params.forumthemeid)
        this.props.fetchForumTopicComments(this.props.match.params.forumthemeid)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.comments.length !== this.props.comments.length) {
            this.props.fetchForumTopicComments(this.props.match.params.forumthemeid);
        }
    }

    pintarComments(){
        return this.props.comments.map((comment)=>{
                return(
                    <Comment key={comment.id} user={comment.user} content={comment.content}
                             created_date={comment.created_date} owner={comment.owner} id={comment.id}
                             delete_method={this.props.deleteComment} 
                             refresh_comments={this.props.fetchForumTopicComments}
                             topic_id={this.props.match.params.forumthemeid}/>
                );
            }
        );

    }

    pintarHeader(){
        if(this.props.theme.finished){
            return(
                <div style={{paddingLeft: '13%', paddingTop: '2%'}}>
                    <Row >
                        <h4 className="title2ScreenStyle">{this.props.theme.title}</h4>
                        <Button outline color="success" className="buttonopencloseStyle" onClick={this.onopenForumTopic.bind(this)}>Obrir</Button>
                    </Row>
                    <Moment className="text-style" format="DD/MM/YYYY">
                        {this.props.theme.created_date}
                    </Moment>
                    <p className="text-grey-style">Tancat</p>
                    <p className="text-style">{this.props.theme.description}</p>
                </div>
                
            );
        }
        else{
            return(
                <div style={{paddingLeft: '13%', paddingTop: '2%'}}>
                    <Row>
                        <h4 className="title2ScreenStyle">{this.props.theme.title}</h4>
                        <Button outline color="danger" className="buttonopencloseStyle" onClick={this.oncloseForumTopic.bind(this)}>Tancar</Button>
                    </Row>
                    <Moment className="text-style" format="DD/MM/YYYY">
                        {this.props.theme.created_date}
                    </Moment> 
                    <p className="text-style">Obert</p>
                    <p className="text-style">{this.props.theme.description}</p>
                </div>
                
            );
        }

    }

    pintarEstat(){
        if(this.props.finished){
            return(
                <p className="text-style">Tancat</p>
            );
        }
        else{
            return(
                <p className="text-style">Obert</p>
            );
        }
    }

    publishComment(){
        if(this.props.new_comment != ""){
            const commentInfo = {
                content: this.props.new_comment,
                forumtheme: this.props.match.params.forumthemeid
            };
            this.props.publishNewComment(commentInfo);
            this.props.changeNewComment("");
            this.props.fetchForumTopicComments(this.props.match.params.forumthemeid);
        }
    }

    oncloseForumTopic(){
        const forumTopicInfo = {
            finished: true
        };
        this.props.closeForumTopic(this.props.match.params.forumthemeid, forumTopicInfo);
        this.props.fetchForumTopic(this.props.match.params.forumthemeid)
    }

    onopenForumTopic(){
        const forumTopicInfo = {
            finished: false
        };
        this.props.closeForumTopic(this.props.match.params.forumthemeid, forumTopicInfo);
        this.props.fetchForumTopic(this.props.match.params.forumthemeid)
    }

    render(){
        if(this.props.isFetching){
            return(
                <div className="viewStyle content-center">
                    <Spinner size={35} color='#F2A71B'/>
                </div>
            )
        }
        else{
            return(
                <div>
                    <Base/>
                    <div className="viewStyle">
                        {this.pintarHeader()}
                        <hr style={{marginLeft: '10%', marginRight: '11%'}}></hr>
                        <div style={{paddingLeft: '13%', paddingTop: '1%', paddingRight: '11%'}}>
                            <Row>
                                <h4 className="title2ScreenStyle">Comentaris ({this.props.comments.length})</h4>
                            </Row>
                            {this.props.theme.finished ? null:
                                <div style={{flexDirection: 'row'}}>
                                <Form style={{width: '65%'}}>
                                    <FormGroup>
                                        <Input type="textarea" name="text" id="exampleText" value={this.props.new_comment}
                                        onChange={(event)=>this.props.changeNewComment(event.target.value)} />
                                    </FormGroup>
                                </Form>
                                <Link className="buttonCreateStyle" style={{textDecoration: 'none'}}>
                                    <div className="comment-button" onClick={this.publishComment.bind(this)}>  
                                        <p className="text-white">Comentar</p> 
                                    </div>
                                </Link>
                            </div>
                            }
                            {this.pintarComments()}
                        </div>
                        
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.viewforumReducer.theme,
        comments: state.viewforumReducer.comments,
        isFetching: state.viewforumReducer.isFetching,
        new_comment: state.viewforumReducer.new_comment
    }
};
const  mapDispatchToProps = (dispatch)=>{
    return {
        fetchForumTopic: (id) => dispatch(fetchForumTopic(id)),
        fetchForumTopicComments: (id) => dispatch(fetchForumTopicComments(id)),
        changeNewComment: (text) => dispatch(changeNewComment(text)),
        publishNewComment: (commentInfo) => dispatch(publishNewComment(commentInfo)),
        closeForumTopic: (id, forumTopicInfo) => dispatch(closeForumTopic(id, forumTopicInfo)),
        deleteComment: (id, idTopic) => dispatch(deleteComment(id, idTopic))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(viewForumTheme);
