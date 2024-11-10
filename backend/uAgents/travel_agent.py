from uagents import Agent, Context
import requests
import json

# Initialize the agent
agent = Agent(name="travel_agent", seed="your_unique_seed")

# Travel API endpoint (replace with a real one)
TRAVEL_API_URL = "https://api.example.com/flights?source={source}&destination={destination}&date={date}"

@agent.on_message
async def fetch_travel_data(ctx: Context, message: str):
    try:
        data = json.loads(message)
        source = data.get("source")
        destination = data.get("destination")
        date = data.get("date")
        response = requests.get(TRAVEL_API_URL.format(source=source, destination=destination, date=date))
        if response.status_code == 200:
            await ctx.send(json.dumps(response.json()))
        else:
            await ctx.send("Error: API request failed")
    except Exception as e:
        await ctx.send(f"Error: {str(e)}")

if __name__ == "__main__":
    agent.run()
