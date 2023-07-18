import React from "react";
// import useFetch from "../hooks/useFetch"; //Commented out because we're using Apollo Client instead with graphql
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const REVIEWS = gql`
  query GetReviews {
    reviews {
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

function Homepage() {
  // const { loading, error, data } = useFetch(
  //   "http://localhost:1337/api/reviews"
  // );
  //Commented out because we're using Apollo Client instead with graphql

  const { loading, error, data } = useQuery(REVIEWS);

  // console.log("data", data?.reviews?.data);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error}</div>;

  return (
    <>
      {data &&
        data.reviews.data.map((review) => (
          <div key={review?.id} className="review-card">
            <div className="rating">{review.attributes.Rating}</div>
            <h1>{review.attributes.Title}</h1>

            {review.attributes.categories.data.map((category) => (
              <small key={category.id}>{category.attributes.Name}</small>
            ))}

            <p>{review.attributes.Description.substring(0, 200)}...</p>
            <Link to={`/review/${review.id}`}>Read more</Link>
          </div>
        ))}
    </>
  );
}

export default Homepage;
