package simulations

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._

class BasicSimulation extends Simulation {

  val httpProtocol = http
    .baseUrl("https://fluxbank-delta.vercel.app")
    .acceptHeader("application/json")

  val scn = scenario("LoginYMovimientos")
    .exec(
      http("ObtenerToken")
        .post("/oauth/token")
        .formParam("grant_type", "password")
        .formParam("username", "user@example.com")
        .formParam("password", "password123")
        .check(status.is(200))
    )
    .pause(1)
    .exec(
      http("ListarMovimientos")
        .get("/movimientos")
        .header("Authorization", "Bearer tok")
        .check(status.is(200))
    )

  setUp(
    scn.inject(
      rampUsers(100) during (30.seconds),
      constantUsersPerSec(20) during (1.minute)
    )
  ).protocols(httpProtocol)
}
