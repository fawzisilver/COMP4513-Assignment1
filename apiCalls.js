const express = require("express");
const supa = require("@supabase/supabase-js");
const app = express();

const supaUrl = "https://rbtmxamyvubctvgejmbm.supabase.co";
const supaAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJidG14YW15dnViY3R2Z2VqbWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1NzEwOTcsImV4cCI6MjAyNDE0NzA5N30.BVmLh_fGtLM_v2_o82K5wNZuB26z2Ma1QksVk_TYK-Y";

const supabase = supa.createClient(supaUrl, supaAnonKey);

// Returns a list of all seasons
app.get("/api/seasons", async (req, res) => {
  const { data, error } = await supabase.from("seasons").select();

  // if data exists
  if (data.length == 0) {
    res.send({ error: "Not found" });
  } else {
    res.send(data);
  }
});
// http://localhost:8080/api/seasons

// Returns a list of all circuits.
app.get("/api/circuits", async (req, res) => {
  const { data, error } = await supabase.from("circuits").select();

  // if data exists
  if (data.length == 0) {
    res.send({ error: "Not found" });
  } else {
    res.send(data);
  }
});
// http://localhost:8080/api/circuits

// Returns the details of a specific circuit by reference
app.get("/api/circuits/:ref", async (req, res) => {
  const circRef = req.params.ref;

  if (typeof circRef === "string") {
    const { data, error } = await supabase
      .from("circuits")
      .select(`*`)
      .eq("circuitRef", circRef);

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid string" });
  }
});
// http://localhost:8080/api/circuits/monaco

// Returns the circuits used in a specified season
app.get("/api/circuits/season/:year", async (req, res) => {
  const seasonYear = req.params.year;

  if (!isNaN(seasonYear)) {
    const { data, error } = await supabase
      .from("races") //link between 2
      .select("circuitId, year, circuits (circuitRef, name, location, country)")
      .eq("year", seasonYear)
      .order("round", { ascending: true });

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid number" });
  }
});
// http://localhost:8080/api/circuits/season/202a

// Returns a list of all constructors.
app.get("/api/constructors", async (req, res) => {
  const { data, error } = await supabase.from("constructors").select();

  // if data exists
  if (data.length == 0) {
    res.send({ error: "Not found" });
  } else {
    res.send(data);
  }
});
// http://localhost:8080/Assign1/constructors

// Returns the details of a specific constructor by reference
app.get("/api/constructors/:ref", async (req, res) => {
  const construRef = req.params.ref;

  if (typeof construRef === "string") {
    const { data, error } = await supabase
      .from("constructors")
      .select("*")
      .eq("constructorRef", construRef);

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid string" });
  }
});
//http://localhost:8080/Assign1/constructors/williams

// Returns a list of all drivers.
app.get("/api/drivers", async (req, res) => {
  const { data, error } = await supabase.from("drivers").select();

  // data exists
  if (data.length == 0) {
    res.send({ error: "Not found" });
  } else {
    res.send(data);
  }
});
//http://localhost:8080/api/drivers

// Returns the details of a specific driver by reference.
app.get("/api/drivers/:ref", async (req, res) => {
  const drivRef = req.params.ref;

  if (typeof drivRef === "string") {
    const { data, error } = await supabase
      .from("drivers")
      .select("*")
      .eq("driverRef", drivRef);

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid string" });
  }
});
//http://localhost:8080/api/drivers/hamilton

// Returns a list of drivers whose surname begins with the provided substring.
app.get("/api/drivers/search/:substring", async (req, res) => {
  const substr = req.params.substring;

  if (typeof substr === "string") {
    const { data, error } = await supabase
      .from("drivers")
      .select("*")
      .ilike("surname", `${substr}%`);

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid string" });
  }
});
//http://localhost:8080/api/drivers/search/sch

// Returns a list of drivers who participated in a specified race.
app.get("/api/drivers/race/:raceid", async (req, res) => {
  const raceId = req.params.raceid;

  if (!isNaN(raceId)) {
    const { data, error } = await supabase
      .from("races")
      .select("*")
      .eq("raceId", raceId);

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid number" });
  }
});
//http://localhost:8080/api/drivers/race/1106

// Returns the details of a specific race by ID.
app.get("/api/races/:raceid", async (req, res) => {
  const raceId = req.params.raceid;

  if (!isNaN(raceId)) {
    const { data, error } = await supabase
      .from("races")
      .select("circuits (name, location, country)")
      .eq("raceId", raceId);

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid number" });
  }
});
//http://localhost:8080/api/races/1106

// Returns a list of races for a specified season.
app.get("/api/races/season/:year", async (req, res) => {
  const year = req.params.year;

  if (!isNaN(year)) {
    const { data, error } = await supabase
      .from("races")
      .select("*")
      .eq("year", year)
      .order("round", { ascending: true });

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid number" });
  }
});
//http://localhost:8080/api/races/season/2020

// Returns the details of a specific race in a given season and round.
app.get("/api/races/season/:year/:round", async (req, res) => {
  const yeaR = req.params.year;
  const rounD = req.params.round;

  if (!isNaN(yeaR) || !isNaN(rounD)) {
    const { data, error } = await supabase
      .from("races")
      .select("*")
      .eq("year", yeaR)
      .eq("round", rounD);

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid number" });
  }
});
//http://localhost:8080/api/races/season/2022/4

// Returns all races for a given circuit by reference.
app.get("/api/races/circuits/:ref", async (req, res) => {
  const reF = req.params.ref;

  if (typeof reF === "string") {
    const { data, error } = await supabase
      .from("circuits")
      .select()
      .eq("circuitRef", reF);

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid string" });
  }
});
//http://localhost:8080/api/races/circuits/monza

// Returns all races for a given circuit between two years.
app.get("/api/races/circuits/:ref/season/:start/:end", async (req, res) => {
  const ref = req.params.ref;
  const startYear = req.params.start;
  const endYear = req.params.end;

  if (typeof ref === "string" || !isNaN(startYear) || !isNaN(endYear)) {
    const { data, error } = await supabase
      .from("races")
      .select(`*, circuits !inner ()`)
      .gte("year", startYear)
      .lte("year", endYear)
      .eq("circuits.circuitRef", ref)
      .order("year", { ascending: true });

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid data type" });
  }
});
//http://localhost:8080/api/races/circuits/monza/season/2015/2020

// Returns the results for a specific race by ID.
app.get("/api/results/:raceid", async (req, res) => {
  const raceId = req.params.raceid;

  if (!isNaN(raceId)) {
    const { data, error } = await supabase
      .from("results")
      .select(
        "drivers (driverRef, code, forename, surname), races (name, round, year, date), constructors (name, constructorRef, nationality)"
      )
      .eq("raceId", raceId)
      .order("grid", { ascending: true });

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid number" });
  }
});
//http://localhost:8080/Assign1/results/1106

// Returns all race results for a given driver by reference.
app.get("/api/results/driver/:ref", async (req, res) => {
  const driverR = req.params.ref;

  if (typeof driverR == "string") {
    const { data, error } = await supabase
      .from("results")
      .select(
        "*, drivers!inner(driverRef, code, forename, surname), constructors(name, constructorRef, nationality), races(name, round, year, date)"
      )
      .eq("drivers.driverRef", driverR);

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  }
});
//http://localhost:8080/api/results/driver/hamilton

// Returns all the results for a given driver between two years.
app.get("/api/results/driver/:ref/seasons/:start/:end", async (req, res) => {
  const ref = req.params.ref;
  const startYear = req.params.start;
  const endYear = req.params.end;

  const { data, error } = await supabase
    .from("results")
    .select(
      `*, races!inner (round, name, year), drivers!inner(driverRef, code, forename, surname), constructors(constructorRef, name, nationality), status(status)`
    )
    .eq("drivers.driverRef", ref)
    .gte("races.year", startYear)
    .lte("races.year", endYear);

  // if data exists
  if (data.length == 0) {
    res.send({ error: "Not found" });
  } else {
    res.send(data);
  }
});
//http://localhost:8080/api/results/driver/sainz/seasons/2021/2022

// Returns the qualifying results for a specific race by ID
app.get("/api/qualifying/:raceid", async (req, res) => {
  const raceId = req.params.raceid;

  if (!isNaN(raceId)) {
    const { data, error } = await supabase
      .from("qualifying")
      .select(
        "*, races(year, round, name), drivers (driverRef, code, forename, surname), constructors(constructorRef, name, nationality)"
      )
      .eq("raceId", raceId)
      .order("position", { ascending: true });

    //if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid number" });
  }
});
//http://localhost:8080/api/qualifying/1106

// Returns the current season driver standings for a specified race.
app.get("/api/standings/:raceid/drivers", async (req, res) => {
  const raceId = req.params.raceid;

  if (!isNaN(raceId)) {
    const { data, error } = await supabase
      .from("driver_standings")
      .select(
        "points, position, wins, drivers (driverRef, number, code, forename, surname, nationality, url)"
      )
      .eq("raceId", raceId)
      .order("position", { ascending: true });

    //if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid number" });
  }
});
//http://localhost:8080/api/standings/1106/drivers

// Returns the current season constructors standings for a specified race.
app.get("/api/standings/:raceid/constructors", async (req, res) => {
  const raceId = req.params.raceid;

  if (!isNaN(raceId)) {
    const { data, error } = await supabase
      .from("constructor_standings")
      .select("points, position, wins, constructors (name, nationality, url)")
      .eq("raceId", raceId)
      .order("position", { ascending: true });

    // if data exists
    if (data.length == 0) {
      res.send({ error: "Not found" });
    } else {
      res.send(data);
    }
  } else {
    res.send({ error: "Not a valid number" });
  }
});
//http://localhost:8080/api/standings/1106/constructors

app.listen(8080, () => {
  console.log("listening on port 8080");
});
