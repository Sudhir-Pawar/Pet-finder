import React from "react";
import pet from "@frontendmasters/pet";
import Carousal from "./Carousal";
import ErrorBoundry from "./errorboundry";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";
import { navigate } from "@reach/router";

class Details extends React.Component {
  state = { loading: true, showModal: false };
  componentDidMount() {
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        url: animal.url,
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city} - ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
      });
    }, console.error);
  }
  toogleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => navigate(this.state.url);
  render() {
    if (this.state.loading) {
      return <h1>loading....</h1>;
    }
    const {
      name,
      animal,
      location,
      description,
      media,
      breed,
      showModal,
    } = this.state;
    return (
      <div className="details">
        <Carousal media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>

          <ThemeContext.Consumer>
            {([theme]) => {
              return (
                <button
                  onClick={this.toogleModal}
                  style={{ backgroundColor: theme }}
                >
                  Adopt {name}
                </button>
              );
            }}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal && (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toogleModal}>No I'm a Monster</button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    );
  }
}
export default function DetailsWithErrorBoundry(props) {
  return (
    <ErrorBoundry>
      <Details {...props} />
    </ErrorBoundry>
  );
}
