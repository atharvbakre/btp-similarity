import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Guage({ result }) {
  return (
    <div className="center">
      {/* <h1 className="title" style={{ marginLeft: "35%" }}>
        Result
      </h1> */}

      <Container className="p-3">
        <Row>
          <Col>
            <div className="speedometer">
              <ReactSpeedometer
                maxValue={100}
                ringWidth={20}
                customSegmentStops={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                segmentColors={[
                  "#10ec35",
                  "#10ec35",
                  "green",
                  "green",
                  "yellow",
                  "yellow",
                  "orange",
                  "orange",
                  "red",
                  "red",
                ]}
                needleTransitionDuration={9000}
                needleTransition="easeElastic"
                currentValueText={`${Math.round(result * 10000) / 100}%`}
                value={result * 100}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Guage;
