#### Put Database Manipulation Code Here
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine, func


#################################################
# Database Setup
#################################################
engine = create_engine()

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

