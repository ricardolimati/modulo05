import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';
import Container from '../../Container';
import { Loading, Owner, IssuesList } from './style';

function Repository() {
  const { repo } = useParams();
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepositoryData = async () => {
      try {
        const repoName = decodeURIComponent(repo);

        const [repositoryResponse, issuesResponse] = await Promise.all([
          api.get(`/repos/${repoName}`),
          api.get(`/repos/${repoName}/issues`, {
            params: {
              state: 'open',
              per_page: 5,
            },
          }),
        ]);
        // eslint-disable-next-line no-console
        // console.log(repositoryResponse);
        // eslint-disable-next-line no-console
        // console.log(issuesResponse.data);
        setRepository(repositoryResponse.data);
        setIssues(issuesResponse.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchRepositoryData();
  }, [repo]);

  if (loading) {
    return <Loading>Loading...</Loading>;
  }
  console.log(issues);
  return (
    <Container>
      <Owner>
        <Link to="/">Voltar aos repositórios</Link>
        <h1>{repository.name}</h1>
        <p>{repository.description}</p>
        {repository.owner && (
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
        )}
      </Owner>
      <IssuesList>
        {issues.map((issue) => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>
                {issue.labels.map((label) => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>
    </Container>
  );
  // eslint-disable-next-line no-unreachable
  setLoading(false);
}

export default Repository;
