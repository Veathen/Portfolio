import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/Portrait.jpg";
import paw from "../../Assets/Cat paw cleared.png"
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import Tilt from "react-parallax-tilt";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  <img src={paw} style={{maxHeight: "50px"}}/>
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> VITALIY SVIRIDYUK </strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <Tilt>
                <img
                  src={homeLogo}
                  alt="Portrait of Vitaliy Sviridyuk"
                  className="home-main-image img-fluid"
                  style={{ maxHeight: "450px" }}
                />
              </Tilt>
            </Col>
          </Row>
        </Container>
        <Home2 />
      </Container>
      
    </section>
  );
}

export default Home;
