import React from "react";
import pet, { Photo } from "@frontendmasters/pet";
import Carousal from "./Carousal";
import ErrorBoundry from "./errorboundry";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";
import { navigate, RouteComponentProps } from "@reach/router";

class Details extends React.Component<RouteComponentProps<{ id: string }>> {
  public state = {
    loading: true,
    showModal: false,
    name: "",
    animal: "",
    location: "",
    description: "",
    media: [] as Photo[],
    url: "",
    breed: "",
  };
  public componentDidMount() {
    if (!this.props.id) {
      navigate("/");
      return;
    }
    pet.animal(+this.props.id).then(({ animal }) => {
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
  public toogleModal = () =>
    this.setState({ showModal: !this.state.showModal });
  public adopt = () => navigate(this.state.url);
  public render() {
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
export default function DetailsWithErrorBoundry(
  props: RouteComponentProps<{ id: string }>
) {
  return (
    <ErrorBoundry>
      <Details {...props} />
    </ErrorBoundry>
  );
}
