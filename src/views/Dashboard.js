import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Card, CardBody, Row, Col } from "reactstrap";
import { getLocalStorage } from "utils";

function Dashboard() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(getLocalStorage("user"));
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Link to="/admin/active-transactions">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-primary">
                        <i className="nc-icon nc-icon nc-align-left-2 text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="stats text-center m-3">
                        Active Transactions
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Link>
          </Col>

          <Col lg="3" md="6" sm="6">
            <Link to="/admin/transactions">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-success">
                        <i className="nc-icon nc-icon nc-align-center text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="stats text-center m-3">
                        History Transactions
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Link>
          </Col>

          <Col lg="3" md="6" sm="6">
            <Link to="/admin/cost-menu">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-info">
                        <i className="nc-icon nc-icon nc-tag-content text-info" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="stats text-center m-3">Cost Menu</div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Link>
          </Col>

          {user.role && user.role.toLowerCase() === "superadmin" && (
            <>
              <Col lg="3" md="6" sm="6">
                <Link to="/admin/personal-debt">
                  <Card className="card-stats">
                    <CardBody>
                      <Row>
                        <Col md="4" xs="5">
                          <div className="icon-big text-center icon-danger">
                            <i className="nc-icon nc-icon nc-credit-card text-danger" />
                          </div>
                        </Col>
                        <Col md="8" xs="7">
                          <div className="stats text-center m-3">
                            Personal Debt
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Link>
              </Col>
              <Col lg="3" md="6" sm="6">
                <Link to="/admin/personal-saving">
                  <Card className="card-stats">
                    <CardBody>
                      <Row>
                        <Col md="4" xs="5">
                          <div className="icon-big text-center icon-success">
                            <i className="nc-icon nc-icon nc-money-coins text-success" />
                          </div>
                        </Col>
                        <Col md="8" xs="7">
                          <div className="stats text-center m-3">
                            Personal Saving
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Link>
              </Col>
            </>
          )}

          <Col lg="3" md="6" sm="6">
            <Link to="/admin/report">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-icon nc-single-copy-04 text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="stats text-center m-3">Report</div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Link>
          </Col>

          {user.role && user.role.toLowerCase() === "superadmin" && (
            <Col lg="3" md="6" sm="6">
              <Link to="/admin/master-data">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col md="4" xs="5">
                        <div className="icon-big text-center icon-danger">
                          <i className="nc-icon nc-icon nc-settings-gear-65 text-danger" />
                        </div>
                      </Col>
                      <Col md="8" xs="7">
                        <div className="stats text-center m-3">
                          Master Data Menu
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          )}

          <Col lg="3" md="6" sm="6">
            <Link to="/admin/customers">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-dark">
                        <i className="nc-icon nc-icon nc-single-02 text-dark" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="stats text-center m-3">
                        Master Customer
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Link>
          </Col>

          <Col lg="3" md="6" sm="6">
            <Link to="/admin/orders">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-dark">
                        <i className="nc-icon nc-bullet-list-67 text-dark" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="stats text-center m-3">Orders</div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Link>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
