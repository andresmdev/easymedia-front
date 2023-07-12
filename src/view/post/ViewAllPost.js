import React, { useState, useEffect } from 'react';
import { Container, Spinner, FormGroup, Label, Input, Card, CardHeader, CardBody } from 'reactstrap';
import Header from './../../components/Header';
import { getAllUserPostData, getPotsByDateData, getPostByTextDate } from '../../api/request';
import dayjs from 'dayjs';

export default function ViewAllPost() {
  const [loading , setLoading] = useState(false);
  const [date , setDate] = useState("");
  const [text , setText] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getAllPost = async () => {
      setLoading(true);
  
      const res = await getAllUserPostData();
  
      if(res.success === true) {
        setData(res.data);
        setError(false);
      }
      else {
        setError(true);
        setData([]);
      }

      setLoading(false);
    }
    
    getAllPost();
  }, []);

  const getPotsByDate = async (value) => {
    setLoading(true);

    const res = await getPotsByDateData(value, 'all');

    if(res.success === true) {
      setData(res.data);
      setError(false);

      if(res.data.length === 0) {
        setError(true);
      }
    }
    else {
      setError(true);
      setData([]);
    }

    setDate(value);
    setLoading(false);
  }

  const getPostByText = async (value) => {
    setLoading(true);

    const res = await getPostByTextDate(value);

    if(res.success === true) {
      setData(res.data);
      setError(false);

      if(res.data.length === 0) {
        setError(true);
      }
    }
    else {
      setError(true);
      setData([]);
    }

    setText(value);
    setLoading(false);
  }
  
  return (
    <>
      <Header />

      <Container>
        <h1 
          style={{
            color: "#fff", 
            textAlign: "center"
          }}> All publications </h1>
        <br />

        <div>
          <FormGroup>
            <Label for="title" style={{ fontWeight: 'bold'}}>
              Word to Search?
            </Label>
            <Input
              id="title"
              placeholder="Type a word to search"
              type="text"
              value={text}
              onChange={e => getPostByText(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="title" style={{ fontWeight: 'bold'}}>
              Date Select
            </Label>
            <Input
              id="title"
              type="date"
              value={date}
              onChange={e => getPotsByDate(e.target.value)}
            />
          </FormGroup>
        </div>
        
        {
          loading === true ? (
            <div style={{
              textAlign: "center"
            }}>
              <Spinner style={{
                color: "#57bbdb"
              }} />
            </div>
          ) : 
            <>
              {
                (error) ? <div style={{
                  textAlign: "center"
                }}>
                  <h2> Nothing to see here </h2> 
                </div>
                : 
                (data).map((item) => (
                  <Card
                    style={{
                      width: '100%',
                      border: "1px solid #666666",
                      marginBottom: "15px"
                    }}
                  >
                    <CardHeader style={{
                      backgroundColor: "#57bbdb ",
                      color: "#fff",
                    }}>
                      {item.title}
                    </CardHeader>
                    <CardBody style={{
                      backgroundColor: "#666666",
                      color: "#fff",
                    }}>
                      <div>
                        {item.message}
                        <br /> <br />
                      </div>
                      <div>
                        <ul style={{
                          listStyle: "none",
                          padding: "0px",
                          margin: "0px",
                          display: "flex",
                          justifyContent: "space-between"
                        }}>
                          <li>
                            {
                              dayjs(item.date).format('DD/MM/YYYY')
                            }
                          </li>
                          <li>{ item.name }</li>
                        </ul>
                      </div>
                    </CardBody>
                  </Card>
                ))
              }
            </>
        }
        
      </Container>
    </>
  );
}
