import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/Portrait.jpg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
            As a Software Engineering graduate from RIT, I bring experience across full-stack development, DevOps tooling, cloud infrastructure, and embedded systems. I am currently looking for my next software engineering role and enjoy building practical systems that are reliable, maintainable, and clear for the people using them.
              <br />
              <br />I am fluent in technologies such as
              <i>
                <b className="red"> C++, Javascript and Python. </b>
              </i>
              <br />
              <br />
              My field of Interest's are designing new &nbsp;
              <i>
                <b className="red">Web Products and Embedded Systems Solutions </b> and
                also in areas related to{" "}
                <b className="red">
                  Server Side Development.
                </b>
              </i>
              <br />
              <br />
              Whenever possible, I also apply my passion for developing Projects
              with <b className="red">Java</b> and
              <i>
                <b className="red">
                  {" "}
                  C++
                </b>
              </i>
            
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt glareEnable={false} glareBorderRadius="100rem">
              <img src={myImg} className="img-fluid portrait" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="red">connect </span>with me
            </p>
            <ul className="home-about-social-links">
            <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/vitaliy-sviridyuk/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://github.com/Veathen"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
