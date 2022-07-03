/* Each filename of a dataset file (eg "datasets/agpt/2022_01_01_03_AggregatedGenerationPerType16.1.BC.csv") 
 * is described with a json object of a specified schema.
 * This file concerns functions about the handling of these
 * json objects which representing dataset files' filenames.
 */


const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
    "type": "object",
    "properties": {
        "dataset": {
            "type": "string"
        },
        "date": {
            "type": "string"
        },
        "time": {
            "type": "string"
        }
    },
    "required": ["dataset","date","time"],
    "additionalProperties": false
  };

const available_datasets = ["fft", "agpt", "atl"];
const s3path = "datasets/";

/* This function takes a json object
 * which describes a specific filename
 * and checks it's correctness, in terms
 * of structure (checks against the schema provided above)
 * and integrity of fields.
 * More specifically the "dataset" must be one of the
 * ones predifined in available_datasets const and the date and times
 * valid.
 */
function validate_fname_obj(f_obj){
    console.log(f_obj.dataset);
    return ajv.validate(schema, f_obj) 
        && available_datasets.includes(f_obj.dataset)   
}



/* This function takes a json object of the format
 * described in `schema` 
 * and returns the corresponding dataset csv's filename.
 * For this is exploits that all filenames are written in the
 * conversion: YYYY_MM_DD_HH_FullDatasetsNameAA.B.CC.csv
 */
function create_filename() {
    var input = {
        dataset: "atl", date: "date", time: "mutime"
    };
    const isValid = validate_fname_obj(input);
    if (!isValid) console.log("Error, dataset filename json object is invalid");
    else {
        // create filename
    }
    return "datasets/agpt/2022_01_01_03_AggregatedGenerationPerType16.1.BC.csv";
}

// create_filename();
module.exports = create_filename;