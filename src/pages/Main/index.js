import React, { Component } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../Container';
import { Form, SubmitButton, List } from './style';

export default class Main extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    newRepo: '',
    // eslint-disable-next-line react/no-unused-state
    respositories: [],
    loading: false,
  };

  componentDidMount() {
    const respositories = localStorage.getItem('respositories');
    if (respositories) {
      this.setState({ respositories: JSON.parse(respositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { respositories } = this.state;
    if (prevState.respositories !== respositories) {
      localStorage.setItem('respositories', JSON.stringify(respositories));
    }
  }

  handleInputChange = (e) => {
    this.setState({ newRepo: e.target.value });
  };

  // eslint-disable-next-line class-methods-use-this
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { newRepo, respositories } = this.state;
    const response = await api.get(`/repos/${newRepo}`);
    const data = {
      name: response.data.full_name,
    };
    this.setState({
      // eslint-disable-next-line react/no-unused-state, no-undef
      respositories: [...respositories, data],
      newRepo: '',
      // eslint-disable-next-line react/no-unused-state
      loading: false,
    });
  };

  render() {
    const { newRepo, loading, respositories } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repository
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {respositories.map((repository) => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
