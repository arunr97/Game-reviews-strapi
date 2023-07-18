import React from "react";
import { useParams } from "react-router-dom";
// import useFetch from "../hooks/useFetch"; //Commented out because we're using Apollo Client instead with graphql
import { useQuery, gql } from "@apollo/client";

const REVIEW = gql`
  query GET_REVIEW($id: ID!) {
    review(id: $id) {
      data {
        id
        attributes {
          Title
          Rating
          Description
          categories {
            data {
              id
              attributes {
                Name
              }
            }
          }
        }
      }
    }
  }
`;

export default function ReviewDetails() {
  const { id } = useParams();
  // const { loading, error, data } = useFetch(
  //   "http://localhost:1337/api/reviews/" + id
  // ); //Commented out because we're using Apollo Client instead with graphql

  const { loading, error, data } = useQuery(REVIEW, { variables: { id: id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // console.log("data", data);

  return (
    <div className="review-card">
      <div className="rating">{data.review.data.attributes.Rating}</div>
      <h2>{data.review.data.attributes.Title}</h2>

      {data.review.data.attributes.categories.data.map((category) => (
        <small key={category.id}>{category.attributes.Name}</small>
      ))}

      <p>{data.review.data.attributes.Description}</p>
    </div>
  );
}
