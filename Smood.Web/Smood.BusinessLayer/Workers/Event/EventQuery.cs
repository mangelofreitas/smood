using Elasticsearch.Net;
using Newtonsoft.Json.Linq;
using Smood.BusinessLayer.Base.Workers;
using Smood.BusinessLayer.Workers.Event.DTO;
using Smood.DataLayer.Context;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Smood.BusinessLayer.Workers.Event
{
    public class EventQuery : BaseWorker
    {
        public EventQuery(DatabaseContext context) : base(context) {}

        public IQueryable<EventListDTO> GetAll(string basePath)
        {
            //var basePath = Directory.GetCurrentDirectory();
            return DatabaseContext.Events.Where(e => e.DeleteDate == null).Select(e => new EventListDTO
            {
                EventId = e.EventId,
                Name = e.Name,
                ImageUrl = e.ImagePath.Replace(basePath, "").Replace("\\", "/"),
                EndDate = e.EndDate,
                StartDate = e.StartDate
            });
        }

        public EventUpdateDTO GetById(int eventId, string basePath)
        {
            //var basePath = Directory.GetCurrentDirectory();
            return DatabaseContext.Events.Where(e => e.EventId == eventId && e.DeleteDate == null).Select(e => new EventUpdateDTO
            {
                EventId = e.EventId,
                Name = e.Name,
                Description = e.Description,
                Location = e.Location,
                ImageUrl = e.ImagePath.Replace(basePath, "").Replace("\\", "/"),
                PhotoUrls = e.EventPhotos.Select(p => p.FilePath.Replace(basePath, "").Replace("\\", "/")),
                Code = e.Code,
                EndDate = e.EndDate,
                StartDate = e.StartDate
            }).FirstOrDefault();
        }

        public ChartDTO GetEmotionsByRange(int eventId, DateTime startDate, DateTime endDate)
        {
            // TODO: filter elasticsearch by event code
            var @event = DatabaseContext.Events.FirstOrDefault(e => e.EventId == eventId && e.DeleteDate == null);

            var settings = new ConnectionConfiguration(new Uri("http://206.189.30.185:9200"))
                                .RequestTimeout(TimeSpan.FromMinutes(2));

            var lowlevelClient = new ElasticLowLevelClient(settings);

            var searchResult = lowlevelClient.Search<StringResponse>("shift-simplified", PostData.Serializable(new
            {
                size = 0,
                query = new
                {
                    range = new
                    {
                        timestamp = new
                        {
                            gte = startDate,
                            lt = endDate
                        }
                    }
                },
                aggs = new
                {
                    groupByHour = new
                    {
                        date_histogram = new
                        {
                            field = "timestamp",
                            interval = "hour",
                            //format = "yyyy-MM-dd",
                            min_doc_count = 0,
                            extended_bounds = new
                            {
                                min = startDate,
                                max = endDate
                            }
                        },
                        aggs = new
                        {
                            avgHappy = new
                            {
                                avg = new
                                {
                                    field = "emotions.HAPPY"
                                }
                            },
                            avgAngry = new
                            {
                                avg = new
                                {
                                    field = "emotions.ANGRY"
                                }
                            },
                            avgSad = new
                            {
                                avg = new
                                {
                                    field = "emotions.SAD"
                                }
                            },
                            avgUnknown = new
                            {
                                avg = new
                                {
                                    field = "emotions.UNKNOWN"
                                }
                            },
                            avgCalm = new
                            {
                                avg = new
                                {
                                    field = "emotions.CALM"
                                }
                            },
                            avgDigusted = new
                            {
                                avg = new
                                {
                                    field = "emotions.DISGUSTED"
                                }
                            },
                            avgSurprised = new
                            {
                                avg = new
                                {
                                    field = "emotions.SURPRISED"
                                }
                            },
                            avgConfused = new
                            {
                                avg = new
                                {
                                    field = "emotions.CONFUSED"
                                }
                            }
                        }
                    }
                }
            }));

            //if ()
            //{
            var jsonResponse = JObject.Parse(searchResult.Body);
            var buckets = jsonResponse["aggregations"]["groupByHour"]["buckets"].ToArray();

            var finalResponse = new ChartDTO
            {
                Labels = new List<string>(),
                Series = new List<ChartSeriesDTO>()
            };
                                  

            var happyList = new List<decimal?>();
            var angryList = new List<decimal?>();
            var sadList = new List<decimal?>();
            var unknownList = new List<decimal?>();
            var calmList = new List<decimal?>();
            var digustedList = new List<decimal?>();
            var surprisedList = new List<decimal?>();
            var confusedList = new List<decimal?>();

            foreach (var bucket in buckets)
            {
                var label = bucket["key_as_string"].ToString();
                finalResponse.Labels.Add(label);

                var happyValue = bucket["avgHappy"]["value"].ToString();
                var angryValue = bucket["avgAngry"]["value"].ToString();
                var sadValue = bucket["avgSad"]["value"].ToString();
                var unknownValue = bucket["avgUnknown"]["value"].ToString();
                var calmValue = bucket["avgCalm"]["value"].ToString();
                var digustedValue = bucket["avgDigusted"]["value"].ToString();
                var surprisedValue = bucket["avgSurprised"]["value"].ToString();
                var confusedValue = bucket["avgConfused"]["value"].ToString();


                happyList.Add(happyValue == "" ?    (decimal?)null: Convert.ToDecimal(happyValue));
                angryList.Add(angryValue == "" ?    (decimal?)null: Convert.ToDecimal(angryValue));
                sadList.Add(sadValue == "" ?      (decimal?)null: Convert.ToDecimal(sadValue));
                unknownList.Add(unknownValue == "" ?   (decimal?)null: Convert.ToDecimal(unknownValue));
                calmList.Add(calmValue == "" ?     (decimal?)null: Convert.ToDecimal(calmValue));
                digustedList.Add(digustedValue == "" ? (decimal?)null: Convert.ToDecimal(digustedValue));
                surprisedList.Add(surprisedValue == "" ?(decimal?)null: Convert.ToDecimal(surprisedValue));
                confusedList.Add(confusedValue == "" ? (decimal?)null: Convert.ToDecimal(confusedValue));
            }


            finalResponse.Series = new List<ChartSeriesDTO>
            {
                new ChartSeriesDTO {
                    Label = "Happy",
                    Data = happyList
                },
                new ChartSeriesDTO
                {
                    Label = "Angry",
                    Data = angryList
                },
                new ChartSeriesDTO
                {
                    Label = "Sad",
                    Data = sadList
                },
                new ChartSeriesDTO
                {
                    Label = "Unknown",
                    Data = unknownList
                },
                new ChartSeriesDTO
                {
                    Label = "Calm",
                    Data = calmList
                },
                new ChartSeriesDTO
                {
                    Label = "Digusted",
                    Data = digustedList
                },
                new ChartSeriesDTO
                {
                    Label = "Surprised",
                    Data = surprisedList
                },
                new ChartSeriesDTO
                {
                    Label = "Confused",
                    Data = confusedList
                }
            };

            return finalResponse;
        }
    }
}
