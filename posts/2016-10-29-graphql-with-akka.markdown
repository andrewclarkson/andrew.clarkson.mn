---
title: GraphQL with Akka
---

## GraphQL

GraphQL is about the coolest thing in APIs since REST. Contrary to the zietgiest, REST and GraphQL are not mutually exclusive and are better together, but that's a discussion for another post. The reason GraphQL is so cool, and why it has created so much buzz is actually (thank goodness) a technical one.

Network communication is about the most expensive thing that most applications do. Even though networks are getting faster, we are using them in more interesting and more intensive ways, for instance social networks on tiny devices with intermittent network connections (mobile, wearable, iot, etc). RESTful APIs are still great. They are simple to work with, and can be incredibly scalable, but they can suck in terms of network latency and bandwidth. The path to great API's on bad networks is fewer requests and minimal responses. In other words, get _only_ you need in _one_ request. This is exactly what GraphQL does.

## Akka

I've fallen in love with Akka. Akka is an Erlang-style actor framework in Scala. It's functional, performant, scalable, and still pretty easy to work with. It's my first choice for any projects that require concurrency and networking.

## Building a Meetup Clone

In order to show of some of the capabilities of GraphQL, I'll be building a partial Meetup clone using Akka Http backed by Cassandra. This example could easily be traslated to another data store (riak, postgres, etc) or applications akka-powered web framework (Play, Spray, Scalatra, etc).

Luckily there's a great library for handling GraphQL in Scala called [Sangria](http://sangria-graphql.org/) that will allow us to focus on the business logic. Let's start with the data. In order for Sangria to understand queries we need to come up with schemas for our Meetup clone.

To keep the example simple I'll focus on three entities from the Meetup API groups, members, and events.

In Sangria the smallest part of a schema is the field. Here's an example of a field:

```
Field("fieldName", StringType, Some("The optional description of the field"), resolve = _.value.field),
```

A field takes a name, type, description, and a resolver. Most of these are pretty self-explanatory with the exception of `resolve`. `resolve` expects the type `Context[Ctx, Val] => Action[Ctx, Res]`. This is pretty gnarly so let me break it down. `Ctx` and `Val` will be passed in by you. `Ctx` represents some data fetching mechanism and `Val` represents some value. Usually the resolvers on the field level will just be picking the values out of class, but it can also do more complex tasks. `Action` is a very permissive type. It allows us to return a value compatable with the type we pass in `StringType` with `String`. The internals of this are pretty magical, but for now let's stick with [scala types](http://sangria-graphql.org/learn/#scalar-types).

```scala

val Group = ObjectType(
    "Group", 
    "A group of people focused on a specific topic",
    fields[GroupRepo, Group](
       Field("id", StringType, Some("The unique uuid of a group."), resolve = _.value.id),
       Field("name", StringType, Some("The name of the group"), resolve = _.value.name),
       Field("urlname", StringType, Some("The url path used to identify the group"), resolve = _.value.urlname),
       Field("country", StringType, Some("The ISO_3166-1 country code of the group"), resolve = _.value.country),
       Field("city", StringType, Some(""), resolve = _)
    )
)
``` 