from datetime import datetime, timedelta
from time import sleep
import os
import argparse

def hourly_it(start, finish):
    while finish >= start: #end inclusive
            yield start
            start = start + timedelta(hours=1)

def date(date_str):
    try:
        datetime.strptime(date_str, '%Y-%m-%d')
        return date_str
    except ValueError:
        raise ValueError("Incorrect data format, should be YYYY-MM-DD")


parser = argparse.ArgumentParser(description='Periodically publish ENTSOE csv dataset files into kafka')

# Command line arguments: -t KAFKA_TOPIC -f CSV_FILENAME
parser.add_argument("--dataset", choices=["fft", "agpt", "atl"], help="Dataset type")
parser.add_argument("--topic", type = str, help="Kafka topic to publish the csv dataset file")
parser.add_argument("-start", "--start-date", type = date, help="Start date of the filenames")
parser.add_argument("-end", "--end-date", type = date, help="End date of the filenames")
parser.add_argument("-t", "--sec", type = int, help="Time in seconds between each csv publication")
# parser.add_argument("-f", "--filename", help="Filename of the csv dataset file to be published. If ommitted will download all files from this dataset.")

args = parser.parse_args()

start = datetime.strptime(args.start_date, '%Y-%m-%d')
finish = datetime.strptime(args.end_date, '%Y-%m-%d')
csv_filename_format = "datasets/" + args.dataset + "/%Y_%m_%d_%H_AggregatedGenerationPerType16.1.BC.csv"
for hour in hourly_it(start, finish):
    csv_filename = hour.strftime(csv_filename_format)
    os.system("node publish_csv.js -f {} -t {}".format(csv_filename, args.topic))
    # print("node publish_csv.js -f {} -t {}".format(csv_filename, args.topic))
    sleep(args.sec)


# python3 publisher_deamon.py --dataset agpt --topic fft-csv --start-date 2022-1-1 --end-date 2022-2-2 -t 2



