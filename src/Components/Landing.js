import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Nav,
  Placeholder,
  Dropdown,
} from "react-bootstrap";
import hamburger from "../Assets/Images/hamburger.png";
import arrow from "../Assets/Images/arrowleft.png";
import fb from "../Assets/Images/fb.png";
import twitter from "../Assets/Images/twitter.png";
import linkedin from "../Assets/Images/linkedin.png";
import youtube from "../Assets/Images/youtube.png";

import { useDispatch, useSelector } from "react-redux";
import { setCountryList, setFilter } from "../Redux/Slices/countrySlice";

const LandingPage = () => {
  const dispatch = useDispatch();

  const { countryList, filter } = useSelector((state) => state.landing);
  // Country data list and the filter value using Redux.

  const [count, setCount] = useState(10); // Used to load / slice country list into smaller section for Pagination.
  const [dummyActive, setDummyActive] = useState(0);
  // state for dummy dots. Had a little confusion in this area since the figma design did not specify anything.
  // So i used 4 dummy dots, which controls the first 4 countries of the country list.
  // Also, since there's a lot of countries and only one link for flag, i did not use the slider to show different Images.

  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  // used this state to show the selected country's flag and details on the left div and right side

  const [showDropdown, setShowDropdown] = useState(false);
  // Used to toggle hamburger icon for responsive view

  const handleFilterClick = (filter) => {
    dispatch(setFilter(filter)); // redux dispatching for state change
    setActiveIndex(0); // reset active slide
    setShowDropdown(false); // close dropdown
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? countryList.length - 1 : prev - 1));
    // For slider left arrow
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === countryList.length - 1 ? 0 : prev + 1));
    // for slider right arrow
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const navLinkStyle = (current) => ({
    // textDecoration: filter === current ? "underline" : "none",
    borderBottom: filter === current ? "2px solid black" : "none",
    borderRadius: "0px",
    cursor: "pointer",
    fontWeight: filter === current ? "600" : "400",
    color: filter === current ? "#3D3D3D" : "#8B8B8B",
  });
  // Changed the style given in the figma.
  // The figma design had all the boxes with a border of 2px, and a boxshadow
  // but i had a confusion about selection of countries, and used the selected country state to dynamically change the style.
  // Now, selected country box will have a darker border.

  const filteredCountries =
    filter === "All"
      ? countryList
      : countryList.filter((c) => c.region === filter);
  // Used to filter the whole country list based on selected filter value.
  // I used the given api, and used frontend js filtering techniques.

  const getCountries = () => {
    setIsLoading(true); // local loading state
    axios
      .get(`https://restcountries.com/v2/all?fields=name,region,flag`)
      .then((res) => {
        // dispatch to Redux
        dispatch(setCountryList(res.data));
      })
      .catch((err) => {
        console.error("Failed to fetch countries:", err);
      })
      .finally(() => {
        setIsLoading(false); // stop loading
      });
  };

  useEffect(() => {
    if (countryList?.length == 0) {
      getCountries();
    }
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [filter]);

  return (
    <Container style={{ width: "90%", margin: "auto" }}>
      {/* Header */}
      <Row className="mb-3 align-items-center">
        <Col xs={6} md={4}>
          <h1 className="Landing-heading">Countries</h1>
        </Col>

        {/* Desktop View */}
        <Col md={8} className="d-none d-md-flex justify-content-end">
          <Nav variant="pills">
            {[
              "All",
              "Asia",
              "Africa",
              "Americas",
              "Europe",
              "Oceania",
              "Polar",
            ].map((region) => (
              <Nav.Item key={region}>
                <Nav.Link
                  style={navLinkStyle(region)}
                  onClick={() => handleFilterClick(region)}
                  className="Landing-Nav-Link"
                >
                  <span>{region}</span>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>

        {/* Mobile View */}
        <Col xs={6} className="d-flex d-md-none justify-content-end">
          <Dropdown
            show={showDropdown}
            onToggle={() => setShowDropdown(!showDropdown)}
          >
            <Dropdown.Toggle
              as={Button}
              variant="light"
              className="p-0 d-flex align-items-center"
              bsPrefix="." // remove default bootstrap toggle styles including the arrow
            >
              <img src={hamburger} height="24px" alt="menu" />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
              {[
                "All",
                "Asia",
                "Africa",
                "Americas",
                "Europe",
                "Oceania",
                "Polar",
              ].map((region) => (
                <Dropdown.Item
                  key={region}
                  onClick={() => handleFilterClick(region)}
                >
                  {region}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {/* Welcome Title */}
      <Row className="mb-4">
        <Col
          sm={12}
          md={4}
          style={{ padding: "10px", borderTop: "3px solid black" }}
        ></Col>
        <Col sm={12} md={4} className="text-center">
          <h2 className="landing-welcome-title">WELCOME</h2>
        </Col>
        <Col
          sm={12}
          md={4}
          style={{ padding: "10px", borderBottom: "3px solid black" }}
        ></Col>
      </Row>

      {/* Carousel */}
      <Row className="mb-4 g-3">
        {/* Carousel with flags */}
        <Col xs={12} md={8}>
          <div
            className="country-div1"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              position: "relative",
              margin: "0 auto",
            }}
          >
            {/* Flag Image or Placeholder */}
            {filteredCountries[activeIndex]?.flag ? (
              <img
                src={filteredCountries[activeIndex]?.flag}
                alt={filteredCountries[activeIndex]?.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <Placeholder
                as="div"
                animation="glow"
                style={{ width: "100%", height: "100%" }}
              >
                <Placeholder xs={12} style={{ height: "100%" }} />
              </Placeholder>
            )}

            {!isLoading && (
              <>
                {/* Left Arrow */}
                <Button
                  variant="light"
                  onClick={() => {
                    if (activeIndex !== 0) {
                      prevSlide();
                      setDummyActive(0);
                    }
                  }}
                  style={{
                    position: "absolute",
                    left: "10%",
                    bottom: "-50px",
                    transform: "translateY(-50%)",
                    borderRadius: "50%",
                    padding: "5px 10px",
                    background: "transparent",
                    boxShadow: "none",
                    border: "none",
                  }}
                  className="no-hover"
                >
                  <img src={arrow} height="20px" />
                </Button>

                {/* Right Arrow */}
                <Button
                  variant="light"
                  onClick={() => {
                    if (activeIndex != filteredCountries?.length-1) {
                      nextSlide();
                      setDummyActive(0);
                    }
                  }}
                  style={{
                    position: "absolute",
                    right: "10%",
                    bottom: "-50px",
                    transform: "translateY(-50%)",
                    borderRadius: "50%",
                    padding: "5px 10px",
                    background: "transparent",
                    boxShadow: "none",
                    border: "none",
                  }}
                  className="no-hover"
                >
                  <img
                    src={arrow}
                    height="20px"
                    style={{ transform: "rotate(180deg)" }}
                  />
                </Button>
              </>
            )}
          </div>

          {/* Dots */}
          {!isLoading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                marginTop: "10px",
              }}
            >
              {[0, 1, 2, 3].map((idx) => (
                <span
                  key={idx}
                  onClick={() => {
                    setDummyActive(idx);
                    goToSlide(idx);
                  }}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor:
                      idx === dummyActive ? "#1D1B20" : "#FEF7FF",
                    cursor: "pointer",
                    transition: "0.2s",
                  }}
                ></span>
              ))}
            </div>
          )}
        </Col>

        {/* Frame showing country details */}
        <Col xs={12} md={4}>
          <div
            className="country-div2"
            style={{
              backgroundColor: "#e0e0e0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "20px",
            }}
          >
            {/* Country Name */}
            {filteredCountries[activeIndex]?.name ? (
              <h4>{filteredCountries[activeIndex].name}</h4>
            ) : (
              <Placeholder as="h4" animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
            )}

            {/* Region */}
            {filteredCountries[activeIndex]?.region ? (
              <p>{filteredCountries[activeIndex].region}</p>
            ) : (
              <Placeholder as="p" animation="glow">
                <Placeholder xs={4} />
              </Placeholder>
            )}
          </div>
        </Col>
      </Row>

      {/* Country Cards */}
      <Row className="mb-4">
        {isLoading ? (
          <>
            {[...Array(10)].map((_, idx) => (
              <Col md={6} className="mb-3" key={idx}>
                <Placeholder as="div" animation="glow">
                  <Placeholder xs={12} style={{ height: "130px" }} />
                </Placeholder>
              </Col>
            ))}
          </>
        ) : filteredCountries?.length > 0 ? (
          filteredCountries.slice(0, count).map((value, idx) => (
            <Col md={6} className="mb-3" key={idx}>
              <Card
                onClick={() => setActiveIndex(idx)}
                style={{
                  borderRadius: "0px",
                  border:
                    filteredCountries[activeIndex]?.name === value?.name
                      ? "2px solid #3E3E3E"
                      : "2px solid lightgrey",
                  boxShadow: "8px 8px 0px #0000001A",
                  transition: "box-shadow 0.2s ease",
                }}
              >
                <Card.Body className="d-flex align-items-center">
                  <img
                    src={value?.flag}
                    alt={`${value?.name} flag`}
                    className="country-box-img"
                    style={{
                      objectFit: "cover",
                      marginRight: "15px",
                    }}
                  />
                  <div>
                    <Card.Title>{value.name}</Card.Title>
                    <Card.Text>{value.region}</Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No data found
            </p>
          </Col>
        )}
      </Row>

      {/* Load More / Pagination*/}
      {count <= filteredCountries.length && !isLoading && (
        <Row className="mb-4">
          <Col className="text-center">
            <Button
              variant="dark"
              onClick={() => {
                setCount((prev) => prev + 10);
              }}
            >
              Load More
            </Button>
          </Col>
        </Row>
      )}

      {/* Footer */}
      <Row className="text-center" style={{ margin: "100px auto 0px" }}>
        <Col>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 d-inline-block"
          >
            <img
              src={fb}
              alt="Facebook"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </a>

          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 d-inline-block"
          >
            <img
              src={twitter}
              alt="Twitter"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </a>

          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 d-inline-block"
          >
            <img
              src={linkedin}
              alt="LinkedIn"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </a>

          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 d-inline-block"
          >
            <img
              src={youtube}
              alt="YouTube"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </a>
        </Col>
      </Row>

      <Row style={{ margin: "50px auto 100px" }}>
        <Col style={{ textAlign: "center" }}>
          <p className="footer-title1">Example@email.com</p>
          <p className="footer-title2">
            Copyright © 2025 Name. All rights reserved.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
