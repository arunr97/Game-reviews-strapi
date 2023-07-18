import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CATEGORY = gql`
  query GET_CATEGORY($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          Name
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
      }
    }
  }
`;

function Category() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  console.log("data2", data);

  return (
    <div>
      <h2>{data.category.data.attributes.Name}</h2>
      {data.category.data.attributes.reviews.data.map((review) => (
        <div className="review-card" key={review.id}>
          <div className="rating">{review.attributes.Rating}</div>
          <h2>{review.attributes.Title}</h2>

          {review.attributes.categories.data.map((category) => (
            <small key={category.id}>{category.attributes.Name}</small>
          ))}

          <p>{review.attributes.Description.substring(0, 200)}...</p>
          <Link to={`/review/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}

export default Category;
