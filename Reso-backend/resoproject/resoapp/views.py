from django.core.cache import cache
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .scientific_paper_agent_langgraph import app

@csrf_exempt
async def research_paper_agent(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            query = data.get('query')
            if not query:
                return JsonResponse({"error": "Query is required"}, status=400)

            # Check cache
            cached_response = cache.get(query)
            if cached_response:
                return JsonResponse({"result": cached_response})

            # Run the agent
            all_messages = []
            async for chunk in app.astream({"messages": [query]}, stream_mode="updates"):
                for updates in chunk.values():
                    if messages := updates.get("messages"):
                        all_messages.extend(messages)

            # Extract the final answer
            final_answer = all_messages[-1].content if all_messages else "No answer generated."

            # Cache the result
            cache.set(query, final_answer, timeout=60 * 15)  # Cache for 15 minutes

            return JsonResponse({"result": final_answer})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Only POST requests are allowed"}, status=405)