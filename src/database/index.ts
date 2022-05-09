import { DataSource } from "typeorm";

import ormconfig from "../config/ormconfig";

const dataSource: DataSource = new DataSource(ormconfig);

const connection = await dataSource.initialize();
